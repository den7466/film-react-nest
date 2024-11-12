import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FilmsDocument = HydratedDocument<Film>;

@Schema()
export class Schedule {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true })
  hall: number;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  taken: [];
}

@Schema()
export class Film {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);

// import mongoose, { Schema } from 'mongoose';

// const ScheduleSchema = new Schema({
//   id: { type: String, required: true },
//   daytime: { type: String, required: true },
//   hall: { type: Number, required: true },
//   rows: { type: Number, required: true },
//   seats: { type: Number, required: true },
//   price: { type: Number, required: true },
//   taken: { type: [] },
// });

// const FilmSchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   rating: { type: Number, required: true },
//   director: { type: String, required: true },
//   tags: { type: [String], required: true },
//   image: { type: String, required: true },
//   cover: { type: String, required: true },
//   title: { type: String, required: true },
//   about: { type: String, required: true },
//   description: { type: String, required: true },
//   schedule: { type: [ScheduleSchema], required: true },
// });

// const Film = mongoose.model('Film', FilmSchema);

// export default Film;
