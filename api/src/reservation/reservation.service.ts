import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ReservationModel } from 'src/shared/schemas/reservation.schema';
import {
  CreateReservationInput,
  CreateReservationValidator,
} from './request/create-reservation.input';
import { UserModel } from 'src/shared/schemas/user.schema';
import { EventService } from 'src/event/event.service';
import {
  UpdateReservationInput,
  UpdateReservationValidator,
} from './request/update-reservation.input';
import { TicketModel } from 'src/shared/schemas/ticket.schema';
import { EventModel } from 'src/shared/schemas/event.schemas';
import { MyReservationDetailOutput } from './response/my-reservation-detail.output';
import { ReservationMapper } from './mapper/reservationMapper';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(ReservationModel.name) private reservationModel: Model<ReservationModel>,
    @InjectModel(TicketModel.name) private readonly ticketModel: Model<TicketModel>,
    @InjectModel(EventModel.name) private readonly eventModel: Model<EventModel>,
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService
  ) {}

  async createReservation(
    createReservationInput: CreateReservationInput,
    user: UserModel
  ): Promise<ReservationModel> {
    try {
      CreateReservationValidator.parse(createReservationInput);
    } catch (error) {
      throw new BadRequestException(error);
    }
    if (!createReservationInput.eventId) {
      throw new BadRequestException('eventId is required.');
    }

    const eventId = new Types.ObjectId(createReservationInput.eventId);
    const tickets = createReservationInput.tickets.map((ticket) => ({
      ticketId: new Types.ObjectId(ticket.ticketId),
      amount: ticket.amount,
    }));

    const totalAmount = tickets.reduce((sum, ticket) => sum + ticket.amount, 0);

    for (const ticket of tickets) {
      const foundTicket = await this.ticketModel.findById(ticket.ticketId);

      if (!foundTicket) {
        throw new BadRequestException(`Ticket with ID ${ticket.ticketId} not found.`);
      }

      if (foundTicket.quantity < ticket.amount) {
        throw new BadRequestException(
          `Not enough tickets available for ticket ID ${ticket.ticketId}. Available: ${foundTicket.quantity}, Requested: ${ticket.amount}`
        );
      }

      foundTicket.quantity -= ticket.amount;
      await foundTicket.save();
    }

    const newReservation = new this.reservationModel({
      eventId,
      userId: user._id,
      tickets,
      amount: totalAmount,
    });

    const createdReservation = await newReservation.save();
    const foundEvent = await this.eventService.findOneById(eventId.toString());
    foundEvent.availableCapacity -= totalAmount;
    await foundEvent.save();
    const reservationId = createdReservation._id as Types.ObjectId;
    await this.eventService.addReservationToEvent(eventId, reservationId);
    return createdReservation;
  }

  async findReservationsByEventId(eventId: string): Promise<ReservationModel[]> {
    const objectId = new Types.ObjectId(eventId);
    return this.reservationModel.find({ eventId: objectId }).exec();
  }

  async updateReservation(
    id: string,
    updateReservationInput: UpdateReservationInput
  ): Promise<ReservationModel> {
    try {
      UpdateReservationValidator.parse(updateReservationInput);
    } catch (error) {
      throw new BadRequestException(error);
    }
    const reservationToUpdate = await this.reservationModel.findById(id);
    if (!reservationToUpdate) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    const ticketChanges = new Map();
    const eventId = reservationToUpdate.eventId.toString();
    for (const old of reservationToUpdate.tickets) {
      const foundTicket = await this.ticketModel.findById(old.ticketId);
      if (!foundTicket) {
        throw new BadRequestException(`Ticket with ID ${old.ticketId} not found.`);
      }

      if (!ticketChanges.has(old.ticketId)) {
        ticketChanges.set(old.ticketId, 0);
      }
      const newTicket = updateReservationInput.tickets.find(
        (t) => t.ticketId === old.ticketId.toString()
      );
      if (newTicket) {
        const diff = newTicket.amount - old.amount;
        ticketChanges.set(old.ticketId, ticketChanges.get(old.ticketId) + diff);
      }
    }

    for (const [ticketId, quantityChange] of ticketChanges) {
      const foundTicket = await this.ticketModel.findById(ticketId);
      if (!foundTicket) {
        throw new BadRequestException(`Ticket with ID ${ticketId} not found.`);
      }
      foundTicket.quantity -= quantityChange;
      reservationToUpdate.tickets.map((ticket) => {
        if (ticket.ticketId.toString() === ticketId.toString()) {
          ticket.amount = ticket.amount + quantityChange;
        }
      });
      const foundEvent = await this.eventModel.findById(eventId);
      foundEvent.availableCapacity -= quantityChange;
      await foundEvent.save();
      await foundTicket.save();
    }
    const allTicketsZero = reservationToUpdate.tickets.every((ticket) => ticket.amount === 0);

    if (allTicketsZero) {
      await this.reservationModel.findByIdAndDelete(reservationToUpdate.id);
      return;
    }
    return await reservationToUpdate.save();
  }

  async remove(id: string): Promise<ReservationModel> {
    return this.reservationModel.findByIdAndDelete(id);
  }

  async findAllReservations(): Promise<ReservationModel[]> {
    return this.reservationModel.find().exec();
  }

  async findOneById(reservationId: string): Promise<ReservationModel> {
    const reservation = await this.reservationModel.findById(reservationId).exec();
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${reservationId} not found`);
    }
    return reservation;
  }

  async findReservationsByUserId(userId: string): Promise<MyReservationDetailOutput[]> {
    const objectId = new Types.ObjectId(userId);

    // Fetch all reservations for the user
    const reservations = await this.reservationModel.find({ userId: objectId }).exec();

    // Check if no reservations were found
    if (!reservations || reservations.length === 0) {
      return [];
    }

    // Map over the reservations to process each one
    const reservationDetails = await Promise.all(
      reservations.map(async (reservation) => {
        const event = await this.eventModel.findById(reservation.eventId).exec();

        if (!event) {
          throw new NotFoundException(`Event not found for ID ${reservation.eventId}`);
        }

        // Fetch ticket details for each reservation
        const ticketDetails = await Promise.all(
          reservation.tickets.map(async (ticket) => {
            const ticketData = await this.ticketModel.findById(ticket.ticketId).exec();

            if (!ticketData) {
              throw new NotFoundException(`Ticket not found for ID ${ticket.ticketId}`);
            }
            return {
              ticketId: ticketData._id.toString(),
              ticketType: ticketData.category,
              ticketAmount: ticket.amount,
            };
          })
        );

        // Convert to the expected output DTO
        return ReservationMapper.toReservationDetailsDto(reservation, event, ticketDetails);
      })
    );

    // Return all the mapped reservation details
    return reservationDetails;
  }

  async getReservationDetailsById(reservationId: string): Promise<MyReservationDetailOutput> {
    const reservation = await this.reservationModel.findOne({ _id: reservationId }).exec();
    if (!reservation) {
      throw new NotFoundException(`Reservation with ${reservationId} not found`);
    }

    const event = await this.eventModel.findById(reservation.eventId).exec();
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const ticketDetails = await Promise.all(
      reservation.tickets.map(async (ticket) => {
        const ticketData = await this.ticketModel.findById(ticket.ticketId).exec();
        if (!ticketData) {
          throw new NotFoundException(`Ticket not found for ID ${ticket.ticketId}`);
        }
        return {
          ticketId: ticketData._id.toString(),
          ticketType: ticketData.category,
          ticketAmount: ticket.amount,
        };
      })
    );

    return ReservationMapper.toReservationDetailsDto(reservation, event, ticketDetails);
  }

  async deleteReservation(reservationId: string): Promise<void> {
    const reservation = await this.findOneById(reservationId);
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${reservationId} not found`);
    }

    for (const ticket of reservation.tickets) {
      const foundTicket = await this.ticketModel.findById(ticket.ticketId);
      if (!foundTicket) {
        throw new BadRequestException(`Ticket with ID ${ticket.ticketId} not found.`);
      }
      foundTicket.quantity += ticket.amount;
      await foundTicket.save();
    }
    await this.reservationModel.deleteOne({ _id: reservationId });
  }
  async deleteReservationsByIdList(reservationIds: string[]): Promise<void> {
    for (const reservationId of reservationIds) {
      await this.deleteReservation(reservationId);
    }
  }
}
