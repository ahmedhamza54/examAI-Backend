import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { FavQuestionsService } from './fav-questions.service';
import { CreateFavQuestionDto } from './dto/create-fav-question.dto';
import { UpdateFavQuestionDto } from './dto/update-fav-question.dto';

@Controller('fav-questions')
export class FavQuestionsController {
  constructor(private readonly favQuestionsService: FavQuestionsService) {}

  @Post()
  async create(@Body() createFavQuestionsDto: CreateFavQuestionDto) {
    return this.favQuestionsService.create(createFavQuestionsDto);
  }

  @Get()
  async findAll() {
    return this.favQuestionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.favQuestionsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFavQuestionsDto: UpdateFavQuestionDto,
  ) {
    return this.favQuestionsService.update(id, updateFavQuestionsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.favQuestionsService.remove(id);
  }
}
