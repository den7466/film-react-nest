import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { ReturnFilms, ReturnSchedules } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<ReturnFilms> {
    const result = await this.filmsRepository.findAll();
    return { total: result.length, items: result };
  }

  async findScheduleById(id: string): Promise<ReturnSchedules> {
    const result = await this.filmsRepository.findFilmById(id);
    return { total: result.schedule.length, items: result.schedule };
  }
}
