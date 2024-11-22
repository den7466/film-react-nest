import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { ReturnFilms, ReturnSchedules } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('/')
  async findFilmsAll(): Promise<ReturnFilms> {
    return this.filmsService.findAll();
  }

  @Get('/:id/schedule/')
  async findFilmScheduleById(
    @Param('id') id: string,
  ): Promise<ReturnSchedules> {
    return this.filmsService.findScheduleById(id);
  }
}
