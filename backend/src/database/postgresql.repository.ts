import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetFilmDto } from '../films/dto/films.dto';
import { Films } from '../films/entities/film.entity';
import { Schedules } from '../films/entities/schedule.entity';
import { CreateTicketDto } from '../order/dto/order.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostgresRepository {
  constructor(
    @InjectRepository(Films)
    private filmsRepository: Repository<Films>,
    @InjectRepository(Schedules)
    private schedulesRepository: Repository<Schedules>,
  ) {}

  async filmsFindAll(): Promise<GetFilmDto[]> {
    const films = await this.filmsRepository.find({
      relations: {
        schedule: true,
      },
    });
    if (films.length === 0) {
      return [];
    }
    const newFilms = films.map((film) => {
      const newSchedules = [];
      film.schedule.forEach((schedule) => {
        newSchedules.push({
          ...schedule,
          taken: schedule.taken.length > 0 ? schedule.taken.split(',') : [],
        });
      });
      return {
        ...film,
        tags: film.tags.length > 0 ? film.tags.split(',') : [],
        schedule: newSchedules,
      };
    });
    return newFilms;
  }

  async findFilmById(id: string): Promise<GetFilmDto> {
    const film = await this.filmsRepository.find({
      where: { id: id },
      relations: {
        schedule: true,
      },
    });
    if (film.length > 0) {
      const newSchedules = [];
      film[0].schedule.forEach((schedule) => {
        newSchedules.push({
          ...schedule,
          taken: schedule.taken.length > 0 ? schedule.taken.split(',') : [],
        });
      });
      const newFilm = {
        ...film[0],
        tags: film[0].tags.length > 0 ? film[0].tags.split(',') : [],
        schedule: newSchedules,
      };
      return newFilm;
    }
  }

  async updateFilmSchedules(tikets: CreateTicketDto[]) {
    for (const ticket of tikets) {
      const taken = `${ticket.row}:${ticket.seat}`;
      const scheduleTakens = await this.schedulesRepository.findOneBy({
        id: ticket.session,
      });
      const scheduleTakensClearSpases = scheduleTakens.taken.trim();
      const newTaken =
        scheduleTakensClearSpases.length > 0
          ? scheduleTakensClearSpases + `,${taken}`
          : taken;
      await this.schedulesRepository.update(
        { id: ticket.session },
        { taken: newTaken },
      );
    }
  }
}
