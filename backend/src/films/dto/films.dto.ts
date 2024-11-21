//TODO описать DTO для запросов к /films
export interface Schedule {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface CreateFilmDto {

}
