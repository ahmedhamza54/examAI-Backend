import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from '../schemas/teacher.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Subject } from './../constants/enum'

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

  getSubjects(): Subject[] {
    const subjects = Object.values(Subject);
    console.log('Subjects:', subjects);
    return subjects;
  }


  // Find teachers by subject specialization
  async findTeachersBySubject(subject: Subject): Promise<Teacher[]> {
    console.log('teachers:', this.teacherModel.find({ specialization: subject }).exec());

    return this.teacherModel.find({ specialization: subject }).exec();
  }
  async getSpecialitiesWithCount(): Promise<{ speciality: string; count: number }[]> {
    const result = await this.teacherModel.aggregate([
      {
        $group: {
          _id: '$specialization', // Group by the 'specialization' field
          count: { $sum: 1 },     // Count the number of documents in each group
        },
      },
      {
        $project: {
          _id: 0,                 // Exclude the MongoDB default '_id' field
          speciality: '$_id',     // Rename '_id' to 'speciality'
          count: 1,               // Include the count
        },
      },
    ]);

    return result;
  }
  
}
