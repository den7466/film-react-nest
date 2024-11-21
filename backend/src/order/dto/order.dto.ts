//TODO реализовать DTO для /orders

export interface Ticket {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
  id: string;
}

export interface CreateOrdersDto {
  email: string;
  phone: string;
  tickets: Ticket[];
  id: string;
}
