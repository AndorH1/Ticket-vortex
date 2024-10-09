import { ReservationModel } from 'src/shared/schemas/reservation.schema';
import { MyReservationDetailOutput, TicketDetail } from '../response/my-reservation-detail.output';
import { EventModel } from 'src/shared/schemas/event.schemas';

export class ReservationMapper {
  static toReservationDetailsDto(
    reservation: ReservationModel,
    event: EventModel,
    tickets: TicketDetail[]
  ): MyReservationDetailOutput {
    const reservationDetails = new MyReservationDetailOutput();
    reservationDetails.reservationId = reservation._id.toString();
    reservationDetails.eventId = reservation.eventId.toString();
    reservationDetails.eventName = event.name;
    reservationDetails.eventType = event.type;
    reservationDetails.eventStartDate = event.startDate;
    reservationDetails.eventPhoto = event.photo;
    reservationDetails.tickets = tickets.map((ticket) => {
      const ticketDto = new TicketDetail();
      ticketDto.ticketId = ticket.ticketId;
      ticketDto.ticketType = ticket.ticketType;
      ticketDto.ticketAmount = ticket.ticketAmount;
      return ticketDto;
    });
    return reservationDetails;
  }
}
