import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

interface IFilms {
  total: number;
  items: any[];
}

interface ISchedules {
  total: number;
  items: any[];
}

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<IFilms> {
    const result = await this.filmsRepository.findAll();
    return { total: result.length, items: result };
  }

  async findScheduleById(id: string): Promise<ISchedules> {
    const result = await this.filmsRepository.findFilmById(id);
    return { total: result.schedule.length, items: result.schedule };
  }
}
