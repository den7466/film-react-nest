import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository';
import { CreateOrdersDto, Ticket } from './dto/order.dto';
import { OrdersRepository } from 'src/repository/orders.repository';

interface Order {
  total: number;
  items: Ticket[];
}

interface Error {
  error: string;
}

@Injectable()
export class OrderService {
  constructor(
    private readonly filmsRepository: FilmsRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async createOrder(
    createOrderDto: Omit<CreateOrdersDto, 'id'>,
  ): Promise<Order | Error> {
    try {
      const films = [];
      for (const film of createOrderDto.tickets) {
        const result = await this.filmsRepository.findFilmById(film.film);
        films.push(result);
      }

      for (const film of films) {
        for (const schedule of film.schedule) {
          for (const ticket of createOrderDto.tickets) {
            if (
              schedule.id === ticket.session &&
              schedule.daytime === ticket.daytime &&
              schedule.taken.find(
                (item) => item === `${ticket.row}:${ticket.seat}`,
              )
            ) {
              throw new Error('Tickets already exists');
            }
          }
        }
      }
      // Записываем заказ в базу
      const result = await this.ordersRepository.createOrder(createOrderDto);
      // Записываем в базу занятые места
      for (const ticket of createOrderDto.tickets) {
        const taken = `${ticket.row}:${ticket.seat}`;
        const filmItem = films.find((item) => item.id === ticket.film);
        filmItem.schedule.forEach((element) => {
          if (
            element.id === ticket.session &&
            element.daytime === ticket.daytime
          ) {
            element.taken.push(taken);
          }
        });
        await this.filmsRepository.updateFilmScheduleById(
          ticket.film,
          filmItem.schedule,
        );
      }
      return {
        total: result.tickets.length,
        items: result.tickets,
      };
    } catch (e) {
      return { error: 'Билеты с такими данными уже существует' };
    }
  }
}
