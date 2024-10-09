import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EventModel } from 'src/shared/schemas/event.schemas';
import { CreateEventValidator, EventCreateInput, EventType } from './request/event-create.input';
import { UpdateEventInput, UpdateEventValidator } from './request/update-event.input';
import { TicketModel } from 'src/shared/schemas/ticket.schema';
import { ReservationService } from 'src/reservation/reservation.service';
import { TicketService } from 'src/ticket/ticket.service';
import * as cron from 'node-cron';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/shared/module/email.service';
import { ImageService } from 'src/shared/image/image.service';
import { UserModel } from 'src/shared/schemas/user.schema';

interface FindAllEventsOptions {
  sortField: string;
  sortOrder: string;
  page: number;
  limit: number;
}
@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor(
    @InjectModel(EventModel.name) private eventModel: Model<EventModel>,
    @Inject(forwardRef(() => ReservationService))
    private readonly reservationService: ReservationService,
    @Inject(forwardRef(() => TicketService))
    private readonly ticketService: TicketService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => EmailService))
    private readonly emailService: EmailService,
    @Inject(forwardRef(() => ImageService))
    private readonly imageService: ImageService
  ) {
    this.scheduleNotifications();
  }

  private async sendUpcomingEventNotifications() {
    try {
      const events = await this.eventModel.find().exec();

      if (events.length === 0) {
        console.error('No events found for the next 24 hours.');
        return;
      }

      for (const event of events) {
        const reservations = await this.reservationService.findReservationsByEventId(
          event._id.toString()
        );

        if (reservations.length === 0) {
          console.error('No reservations found for event', event._id.toString());
          continue;
        }
        await Promise.allSettled(
          reservations.map(async (reservation) => {
            const user = await this.userService.findOneById(reservation.userId.toString());
            if (!user?.email) {
              throw new Error('User not found or email is missing for reservation');
            }
            const subject = `Upcoming Event: ${event.name}`;
            const text = `Your event "${event.name}" is starting in less than 24 hours. Don't miss it!`;
            const html = `Your event "<strong>${event.name}</strong>" is starting in less than 24 hours. Don't miss it!`;
            await this.emailService.sendMail(user.email, subject, text, html);
          })
        );
      }
    } catch (error) {
      console.error('Error sending upcoming event notifications:', error);
    }
  }

  private scheduleNotifications() {
    cron.schedule('0 */12 * * *', async () => {
      this.logger.log('Checking for events starting in 24 hours...');
      await this.sendUpcomingEventNotifications();
    });
  }

  async findAllEvents(options: FindAllEventsOptions): Promise<EventModel[]> {
    const { sortField, sortOrder, page, limit } = options;
    const skip = (page - 1) * limit;
    const events = await this.eventModel
      .find()
      .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 }) // Dynamic sorting
      .skip(skip)
      .limit(limit)
      .exec();

    return events;
  }

  async createEvent(
    userModel: UserModel,
    eventCreateInput: EventCreateInput,
    file: Express.Multer.File
  ): Promise<EventModel> {
    eventCreateInput.location.latitude = Number(eventCreateInput.location.latitude);
    eventCreateInput.location.longitude = Number(eventCreateInput.location.longitude);
    try {
      CreateEventValidator.parse(eventCreateInput);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Invalid event create input');
    }
    if (!(Object.values(EventType) as string[]).includes(eventCreateInput.type)) {
      throw new BadRequestException(`Invalid event type: ${eventCreateInput.type}`);
    }

    const photoUrl = await this.imageService.uploadEventPicture(file);
    const createdEvent = new this.eventModel({
      name: eventCreateInput.name,
      description: eventCreateInput.description,
      startDate: eventCreateInput.startDate,
      endDate: eventCreateInput.endDate,
      location: eventCreateInput.location,
      type: eventCreateInput.type.toString(),
      maxCapacity: eventCreateInput.maxCapacity,
      availableCapacity: eventCreateInput.maxCapacity,
      organizer: {
        id: userModel._id,
        firstName: userModel.firstName,
        lastName: userModel.lastName,
        photo: userModel.photo,
      },

      photo: photoUrl,
    });
    return createdEvent.save();
  }

  async findAll(): Promise<EventModel[]> {
    return this.eventModel.find().exec();
  }

  async findOneById(eventId: string): Promise<EventModel> {
    const event = await this.eventModel.findById(eventId).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    return event;
  }

  async deleteEvent(eventId: string): Promise<void> {
    const eventObjectId = new Types.ObjectId(eventId);

    const event = await this.eventModel
      .findById(eventObjectId)
      .populate('tickets')
      .populate('reservations')
      .exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    if (event.reservations && event.reservations.length > 0) {
      await this.reservationService.deleteReservationsByIdList(
        event.reservations.map((reservation) => reservation.id.toString())
      );
    }

    if (event.tickets && event.tickets.length > 0) {
      await this.ticketService.deleteTickets(event.tickets.map((id) => id.toString()));
    }

    await this.eventModel.findByIdAndDelete(eventObjectId).exec();
  }

  async updateEventById(
    eventId: string,
    updateEventInput: UpdateEventInput,
    file: Express.Multer.File
  ): Promise<EventModel> {
    try {
      UpdateEventValidator.parse(updateEventInput);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Invalid event update input');
    }
    if (!(Object.values(EventType) as string[]).includes(updateEventInput.type)) {
      throw new BadRequestException(`Invalid event type: ${updateEventInput.type}`);
    }
    const eventToUpdate = await this.eventModel.findById(eventId);
    if (!eventToUpdate) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    const capacityDifference = updateEventInput.maxCapacity - eventToUpdate.maxCapacity;
    if (capacityDifference + eventToUpdate.availableCapacity < 0) {
      throw new BadRequestException('Max capacity cannot be less than available capacity');
    }
    const photoUrl = await this.imageService.uploadEventPicture(file);

    eventToUpdate._id = new Types.ObjectId(eventId);
    eventToUpdate.name = updateEventInput.name;
    eventToUpdate.description = updateEventInput.description;
    eventToUpdate.startDate = updateEventInput.startDate;
    eventToUpdate.endDate = updateEventInput.endDate;
    eventToUpdate.location = {
      address: updateEventInput.location.address,
      latitude: updateEventInput.location.latitude,
      longitude: updateEventInput.location.longitude,
    };
    eventToUpdate.type = updateEventInput.type;
    eventToUpdate.availableCapacity += updateEventInput.maxCapacity - eventToUpdate.maxCapacity;
    eventToUpdate.maxCapacity = updateEventInput.maxCapacity;
    eventToUpdate.photo = photoUrl;
    return eventToUpdate.save();
  }

  async update(event: EventModel): Promise<EventModel> {
    const updatedEvent = await this.eventModel
      .findByIdAndUpdate(event._id, event, { new: true })
      .exec();

    if (!updatedEvent) {
      throw new NotFoundException(`Event with ID ${event._id} not found`);
    }

    return updatedEvent;
  }

  async getEventBySearchTerm(searchTerm: string): Promise<EventModel[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      return [];
    }
    const events = await this.eventModel
      .find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { location: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { type: { $regex: searchTerm, $options: 'i' } },
        ],
      })
      .exec();
    return events;
  }

  async searchEvents(searchTerm: string): Promise<EventModel[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      return await this.orderEventsByDate();
    }
    const events = await this.getEventBySearchTerm(searchTerm);
    return events;
  }

  async orderEventsByDate(): Promise<EventModel[]> {
    const events = await this.eventModel.find().exec();
    return events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }

  async getEventsWithTicketAndReservationByEventId(eventId: string): Promise<EventModel> {
    const event = await this.eventModel
      .findOne({ _id: eventId })
      .populate('tickets')
      .populate('reservations')
      .exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    return event;
  }

  async getAllEventsWithTicketAndReservation(): Promise<EventModel[]> {
    const events = await this.eventModel.find().populate('tickets').populate('reservations').exec();
    return events;
  }

  async addTicketToEvent(eventId: string, ticketModel: TicketModel): Promise<EventModel> {
    const event = await this.eventModel.findById(eventId).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    if (!(ticketModel._id instanceof Types.ObjectId)) {
      throw new BadRequestException(`Invalid ticket ID`);
    }
    event.tickets.push(ticketModel._id);
    return event.save();
  }

  async addReservationToEvent(
    eventId: Types.ObjectId,
    reservationId: Types.ObjectId
  ): Promise<EventModel> {
    const event = await this.eventModel.findById(eventId).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    if (!(reservationId instanceof Types.ObjectId)) {
      throw new BadRequestException(`Invalid reservation ID`);
    }
    event.reservations.push(reservationId);
    return event.save();
  }

  async getEventById(eventId: string): Promise<EventModel> {
    const event = await this.eventModel.findById(eventId).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    return event;
  }
}
