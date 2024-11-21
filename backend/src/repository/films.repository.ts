import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './films.schema';
import { Schedule } from 'src/films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  findAll(): Promise<Film[]> {
    return this.filmModel.find();
  }

  findFilmById(id: string): Promise<Film> {
    return this.filmModel.findOne({ id: id });
  }

  updateFilmScheduleById(id: string, schedule: Schedule[]) {
    return this.filmModel.updateOne(
      { id: id },
      { $set: { schedule: schedule } },
    );
  }
}
