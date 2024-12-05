import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CreateOrdersDto } from 'src/order/dto/order.dto';

@Injectable()
export class OrdersRepository {
  private orders: CreateOrdersDto[] = [];
  createOrder(order: Omit<CreateOrdersDto, 'id'>): CreateOrdersDto {
    this.orders.forEach((element) => {
      element.tickets.forEach((ticket) => {
        if (
          order.tickets.find(
            (item) =>
              item.film === ticket.film &&
              item.daytime === ticket.daytime &&
              item.row === ticket.row &&
              item.seat === ticket.seat,
          )
        ) {
          throw new Error('Билеты с такими данными уже существует');
        }
      });
    });
    const ticketsWithId = [];
    order.tickets.forEach((item) => {
      ticketsWithId.push({ ...item, id: faker.string.uuid() });
    });

    const newOrder: CreateOrdersDto = {
      id: faker.string.uuid(),
      email: order.email,
      phone: order.phone,
      tickets: ticketsWithId,
    };

    this.orders.push(newOrder);

    return newOrder;
  }
}
