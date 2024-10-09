export interface Ticket {
  eventId: string;
  price: number;
  category: string;
  quantity: number;
}

export interface Tickets {
  _id: string;
  ticketId: string;
  amount: number;
}
