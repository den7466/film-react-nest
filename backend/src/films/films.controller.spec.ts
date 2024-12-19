import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let filmController: FilmsController;
  let filmService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn(),
        findScheduleById: jest.fn(),
      })
      .compile();

    filmController = module.get<FilmsController>(FilmsController);
    filmService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(filmController).toBeDefined();
  });

  it('.findAll() should call findAll method of the service', () => {
    filmController.findFilmsAll();
    expect(filmService.findAll).toHaveBeenCalled();
  });

  it('.findScheduleById() should call findScheduleById method of the service', () => {
    filmController.findFilmScheduleById({ id: '0' });
    expect(filmService.findScheduleById).toHaveBeenCalled();
  });
});
