import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, Schedule } from './films.schema';

interface IFilms {
  total: number;
  items: Film[];
}

interface ISchedules {
  total: number;
  items: Schedule[];
}

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  async findAll(): Promise<IFilms> {
    const result = await this.filmModel.find();
    return { total: result.length, items: result };
  }

  async findScheduleById(id: string): Promise<ISchedules> {
    const result = await this.filmModel.findOne({ id: id });
    return { total: result.schedule.length, items: result.schedule };
  }
}
