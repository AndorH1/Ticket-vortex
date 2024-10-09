import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketModel } from 'src/shared/schemas/ticket.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTicketInput } from './request/create-ticket.input';
import { UpdateTicketInput } from './request/update-ticket.input';
import { VerifiedRole } from 'src/shared/decorators/verified.decorator';

@ApiTags('ticket')
@Controller('ticket')
@ApiBearerAuth()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @VerifiedRole()
  @Post('createTicket')
  async createTicket(@Body() createTicket: CreateTicketInput): Promise<TicketModel> {
    return this.ticketService.createTicket(createTicket);
  }

  @Get('getAllTickets')
  async findAllTickets(): Promise<TicketModel[]> {
    return this.ticketService.findAll();
  }

  @Get(':ticketId')
  async getTicket(@Param('ticketId') id: string): Promise<TicketModel> {
    return this.ticketService.getTicketById(id);
  }

  @Get('getTicketsByEventId/:eventId')
  async getTicketsByEventId(@Param('eventId') eventId: string): Promise<TicketModel[]> {
    return this.ticketService.getTicketsByEventId(eventId);
  }

  @VerifiedRole()
  @Put(':id')
  async updateTicket(
    @Param('id') id: string,
    @Body() updateTicket: UpdateTicketInput
  ): Promise<TicketModel> {
    return this.ticketService.updateTicketById(id, updateTicket);
  }

  @VerifiedRole()
  @Delete(':id')
  async deleteTicket(@Param('id') id: string): Promise<void> {
    await this.ticketService.deleteTickets([id]);
  }
}
