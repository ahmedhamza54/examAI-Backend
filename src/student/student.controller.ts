import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Grade } from './../constants/enum'


@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('grades')
  async getGrades(){
    return this.studentService.getGrades();
  }

  @Get('by-grade/:grade')
  async findTeachersBySubject(@Param('grade') grade: Grade) {
    return this.studentService.findStudentsByGrade(grade);
  }

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }

 
}
