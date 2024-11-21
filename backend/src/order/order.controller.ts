import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrdersDto } from './dto/order.dto';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/')
  create(@Body() createOrderDto: CreateOrdersDto): any {
    return this.orderService.createOrder(createOrderDto);
  }
}
