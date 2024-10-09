import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationInput } from './request/create-reservation.input';
import { UpdateReservationInput } from './request/update-reservation.input';
import { ReservationModel } from 'src/shared/schemas/reservation.schema';
import { CurrentUser } from 'src/shared/decorators/auth.decorators';
import { AdminRole, UserRole } from 'src/shared/decorators/roles.decorator';
import { UserModel } from 'src/shared/schemas/user.schema';
import { MyReservationDetailOutput } from './response/my-reservation-detail.output';

@ApiTags('reservation')
@Controller('reservation')
@ApiBearerAuth()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UserRole()
  async createReservation(
    @Body() createReservationInput: CreateReservationInput,
    @CurrentUser() userModel: UserModel
  ): Promise<ReservationModel> {
    return this.reservationService.createReservation(createReservationInput, userModel);
  }

  @AdminRole()
  @Get('getAllReservations')
  async findAllReservations(): Promise<ReservationModel[]> {
    return this.reservationService.findAllReservations();
  }

  @UserRole()
  @Get('my')
  async getMyReservations(@CurrentUser() user: UserModel): Promise<MyReservationDetailOutput[]> {
    return this.reservationService.findReservationsByUserId(user.id);
  }

  @Get(':id')
  async getReservation(@Param('id') id: string): Promise<ReservationModel> {
    return this.reservationService.findOneById(id);
  }

  @Put(':id')
  @UserRole()
  async updateReservation(
    @Param('id') id: string,
    @Body() updateReservationInput: UpdateReservationInput
  ): Promise<ReservationModel> {
    return this.reservationService.updateReservation(id, updateReservationInput);
  }

  @UserRole()
  @Get('/my/tickets/:id')
  async getMyTickets(@Param('id') id: string): Promise<MyReservationDetailOutput> {
    return this.reservationService.getReservationDetailsById(id);
  }

  @UserRole()
  @Delete(':id')
  async deleteReservation(@Param('id') id: string, @CurrentUser() user: UserModel): Promise<void> {
    const reservation = await this.reservationService.findOneById(id);

    if (reservation.userId.toString() !== user._id.toString()) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.reservationService.deleteReservation(id);
  }

  @AdminRole()
  @Delete('/byAdmin/:id')
  async deleteReservationByAdmin(@Param('id') id: string): Promise<void> {
    const reservation = await this.reservationService.findOneById(id);
    return this.reservationService.deleteReservation(reservation.id);
  }
}
