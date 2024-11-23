export class Schedule {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class CreateFilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
  schedule: Schedule[];
}

export class GetFilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
  schedule: Schedule[];
}

export class ReturnFilms {
  total: number;
  items: GetFilmDto[];
}

export class ReturnSchedules {
  total: number;
  items: Schedule[];
}
