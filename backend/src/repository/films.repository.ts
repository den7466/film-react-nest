import { Injectable } from '@nestjs/common';
import { GetFilmDto, Schedule } from 'src/films/dto/films.dto';
import { DatabaseRepository } from 'src/database/database.repository';

@Injectable()
export class FilmsRepository {
  constructor(private databaseRepository: DatabaseRepository) {}

  findAll(): Promise<GetFilmDto[]> {
    return this.databaseRepository.filmsFindAll();
  }

  findFilmById(id: string): Promise<GetFilmDto> {
    return this.databaseRepository.findFilmById(id);
  }

  updateFilmScheduleById(id: string, schedule: Schedule[]) {
    return this.databaseRepository.updateFilmScheduleById(id, schedule);
  }
}
