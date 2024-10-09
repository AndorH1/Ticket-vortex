import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { EventCreateInput } from './request/event-create.input';
import {
  mapEventModelToEventInfoOutput,
  mapEventModelToEventSearchOutput,
} from './mapper/event.mapper';
import { EventInfoOutput } from './response/event-info.output';
import { EventModel } from 'src/shared/schemas/event.schemas';
import { UpdateEventInput } from './request/update-event.input';
import { AdminRole } from 'src/shared/decorators/roles.decorator';
import { VerifiedRole } from 'src/shared/decorators/verified.decorator';
import { EventSearchOutput } from './response/event-search.output';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/shared/decorators/auth.decorators';
import { UserModel } from 'src/shared/schemas/user.schema';

@ApiTags('event')
@Controller('event')
@ApiBearerAuth()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @VerifiedRole()
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() eventToCreate: EventCreateInput,
    @CurrentUser() userModel: UserModel
  ): Promise<EventInfoOutput> {
    const event = await this.eventService.createEvent(userModel, eventToCreate, file);
    return mapEventModelToEventInfoOutput(event);
  }

  @Get('getAll')
  async getAllEvents(
    @Query('sortField') sortField: string = 'startDate',
    @Query('sortOrder') sortOrder: string = 'asc',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<EventSearchOutput[]> {
    const events = await this.eventService.findAllEvents({ sortField, sortOrder, page, limit });
    return events.map((event) => mapEventModelToEventSearchOutput(event));
  }

  @Get(':id')
  async getEventById(@Param('id') id: string): Promise<EventInfoOutput> {
    const event = await this.eventService.findOneById(id);
    return mapEventModelToEventInfoOutput(event);
  }

  @VerifiedRole()
  @Get('/:id/tickets&reservations')
  async getTicketsByEventId(@Param('id') id: string): Promise<any> {
    return this.eventService.getEventsWithTicketAndReservationByEventId(id);
  }

  @VerifiedRole()
  @Get('getAll/ticketsWithReservations')
  async getAllEventsWithTicketsAndReservations(): Promise<EventModel[]> {
    return this.eventService.getAllEventsWithTicketAndReservation();
  }

  @Get('/search/:searchTerm')
  @ApiQuery({ name: 'searchTerm', required: false, type: String })
  async searchEvents(@Query('searchTerm') searchTerm?: string): Promise<EventSearchOutput[]> {
    const events = await this.eventService.searchEvents(searchTerm);
    return events.map((event) => mapEventModelToEventSearchOutput(event));
  }

  @AdminRole()
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateEvent(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventInput
  ): Promise<EventModel> {
    return this.eventService.updateEventById(id, updateEventDto, file);
  }

  @AdminRole()
  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<void> {
    await this.eventService.deleteEvent(id);
  }
}
