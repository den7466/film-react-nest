import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetFilmDto, Schedule } from 'src/films/dto/films.dto';
import { Films } from 'src/films/entities/film.entity';
import { Schedules } from 'src/films/entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseRepository {
  constructor(
    @InjectRepository(Films)
    private filmsRepository: Repository<Films>,
    @InjectRepository(Schedules)
    private schedulesRepository: Repository<Schedules>,
  ) {}

  async filmsFindAll(): Promise<any[]> {
    return await this.filmsRepository.find({
      relations: {
        schedule: true,
      },
    });
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

  updateFilmScheduleById(id: string, schedule: Schedule[]) {
    console.log(id);
    return true;
  }
}
