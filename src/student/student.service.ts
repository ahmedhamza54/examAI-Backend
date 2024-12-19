import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Grade } from './../constants/enum'


@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = new this.studentModel(createStudentDto);
    return await newStudent.save();
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async findOne(id: string): Promise<Student> {
    return this.studentModel.findById(id).exec();
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    return this.studentModel.findByIdAndUpdate(id, updateStudentDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Student> {
    return this.studentModel.findByIdAndDelete(id).exec();
  }

  getGrades(): Grade[] {
    const Grades = Object.values(Grade);
    console.log('Grades:', Grades);
    return Grades;
  }

  async findStudentsByGrade(grade: Grade): Promise<Student[]> {
    console.log('students:', this.studentModel.find({ grade: grade }).exec());

    return this.studentModel.find({ grade: grade }).exec();
  }

  async changeGrade(id: string, newGrade: Grade): Promise<Student> {
    const allowedGrades = Object.values(Grade);
    if (!allowedGrades.includes(newGrade)) {
      throw new Error(`Invalid grade. Allowed grades are: ${allowedGrades.join(', ')}`);
    }
    return this.studentModel.findByIdAndUpdate(
      id,
      { grade: newGrade },
      { new: true }
    ).exec();
  }

}
