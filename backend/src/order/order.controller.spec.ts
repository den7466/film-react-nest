import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;
  const mockOrder = {
    email: 'test@test.test',
    phone: '+70000000000',
    tickets: [],
    id: '1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn(),
      })
      .compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  it('.createOrder() should call createOrder method of the service', () => {
    orderController.create(mockOrder);
    expect(orderService.createOrder).toHaveBeenCalled();
  });
});
