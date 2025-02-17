import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from '../schemas/teacher.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const newTeacher = new this.teacherModel(createTeacherDto);
    return await newTeacher.save();
  }

  async findAll(): Promise<Teacher[]> {
    return this.teacherModel.find().exec();
  }

  async findOne(id: string): Promise<Teacher> {
    return this.teacherModel.findById(id).exec();
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    return this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Teacher> {
    return this.teacherModel.findByIdAndDelete(id).exec();
  }
}
