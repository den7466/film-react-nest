import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('/')
  async findFilmsAll(): Promise<any> {
    return this.filmsService.findAll();
  }

  @Get('/:id/schedule/')
  async findFilmScheduleById(@Param('id') id: string): Promise<any> {
    return this.filmsService.findScheduleById(id);
  }
}
