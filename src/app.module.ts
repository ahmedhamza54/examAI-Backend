import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { ExamModule } from './exam/exam.module';
import { ExamAttemptModule } from './exam-attempt/exam-attempt.module';
import { FavQuestionsModule } from './fav-questions/fav-questions.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/exam-AI'),UserModule, TeacherModule, StudentModule, ExamModule, ExamAttemptModule, FavQuestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
