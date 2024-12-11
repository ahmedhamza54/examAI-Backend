import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Subject } from './../constants/enum'


@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get('subjects')
  getSubjects() {
    return this.teacherService.getSubjects();
  }

  // Get teachers by subject specialization
  @Get('by-subject/:subject')
  async findTeachersBySubject(@Param('subject') subject: Subject) {
    return this.teacherService.findTeachersBySubject(subject);
  }

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  async findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }
  @Get('specialities/count')
  async getSpecialitiesWithCount() {
    return this.teacherService.getSpecialitiesWithCount();
  }

  
}
