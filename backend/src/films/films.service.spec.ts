import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let filmService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn(),
        findScheduleById: jest.fn(),
      })
      .compile();

    filmService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(filmService).toBeDefined();
  });
});
