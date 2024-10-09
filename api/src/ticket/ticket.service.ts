import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TicketModel } from 'src/shared/schemas/ticket.schema';
import {
  CreateTicketInput,
  CreateTicketValidator,
  TicketCategory,
} from './request/create-ticket.input';
import { UpdateTicketInput, UpdateTicketValidator } from './request/update-ticket.input';
import { EventService } from 'src/event/event.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(TicketModel.name) private ticketModel: Model<TicketModel>,
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService
  ) {}
  async createTicket(createTicketInput: CreateTicketInput): Promise<TicketModel> {
    createTicketInput.price = Number(createTicketInput.price);
    createTicketInput.quantity = Number(createTicketInput.quantity);
    try {
      CreateTicketValidator.parse(createTicketInput);
    } catch (error) {
      throw new BadRequestException(error);
    }

    const event = await this.eventService.findOneById(createTicketInput.eventId);
    if (!event) {
      throw new NotFoundException(`Event with ID ${createTicketInput.eventId} not found`);
    }

    if (!(Object.values(TicketCategory) as string[]).includes(createTicketInput.category)) {
      throw new BadRequestException(`Invalid ticket category: ${createTicketInput.category}`);
    }

    if (createTicketInput.quantity <= 0) {
      throw new BadRequestException(
        `Invalid ticket quantity: ${createTicketInput.quantity}. Quantity must be greater than 0.`
      );
    }

    if (event.availableCapacity < createTicketInput.quantity) {
      throw new BadRequestException(
        `Not enough capacity. Available capacity: ${event.availableCapacity}`
      );
    }

    event.availableCapacity += createTicketInput.quantity;
    event.maxCapacity += createTicketInput.quantity;
    await this.eventService.update(event);

    const createdTicket = new this.ticketModel(createTicketInput);
    return createdTicket.save();
  }

  async findAll(): Promise<TicketModel[]> {
    return this.ticketModel.find().exec();
  }

  async getTicketById(id: string): Promise<TicketModel> {
    const ticketId = new Types.ObjectId(id);
    const ticket = await this.ticketModel.findOne({ _id: ticketId }).exec();
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }
  ticketId;

  async findAvailableTicketsForEventAndCategory(
    eventId: string,
    category: string
  ): Promise<number> {
    const tickets = await this.ticketModel.find({ eventId, category }).exec();
    return tickets.reduce((total, ticket) => total + ticket.quantity, 0);
  }

  async updateTicketQuantity(ticketId: string, quantity: number): Promise<void> {
    const ticket = await this.ticketModel.findById(ticketId).exec();
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
    }

    if (ticket.quantity < quantity) {
      throw new BadRequestException('Not enough tickets available');
    }

    ticket.quantity -= quantity;
    await ticket.save();
  }

  async updateTicketById(
    ticketId: string,
    updateTicketInput: UpdateTicketInput
  ): Promise<TicketModel> {
    updateTicketInput.price = Number(updateTicketInput.price);
    updateTicketInput.quantity = Number(updateTicketInput.quantity);
    try {
      UpdateTicketValidator.parse(updateTicketInput);
    } catch (error) {
      throw new BadRequestException(error);
    }

    const ticketToUpdate = await this.ticketModel.findById(ticketId);
    if (!ticketToUpdate) {
      throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
    }

    const event = await this.eventService.findOneById(ticketToUpdate.eventId.toString());
    if (!event) {
      throw new NotFoundException(`Event with ID ${ticketToUpdate.eventId.toString()} not found`);
    }
    event.availableCapacity += updateTicketInput.quantity - ticketToUpdate.quantity;
    event.maxCapacity += updateTicketInput.quantity - ticketToUpdate.quantity;
    await this.eventService.update(event);

    ticketToUpdate.quantity = updateTicketInput.quantity;
    ticketToUpdate.price = updateTicketInput.price;
    ticketToUpdate.category = updateTicketInput.category;
    return ticketToUpdate.save();
  }

  async deleteTickets(ticketIds: string[]): Promise<void> {
    await this.ticketModel
      .deleteMany({ _id: { $in: ticketIds.map((id) => new Types.ObjectId(id)) } })
      .exec();
  }

  async getTicketsByEventId(eventId: string): Promise<TicketModel[]> {
    return await this.ticketModel.find({ eventId: eventId }).exec();
  }
}
