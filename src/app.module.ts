import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { ExamModule } from './exam/exam.module';
import { ExamAttemptModule } from './exam-attempt/exam-attempt.module';
import { FavQuestionsModule } from './fav-questions/fav-questions.module';

import config from './config/config';

@Module({
  imports: [
    // Load environment variables and configuration
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),

    // Configure JWT module
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
      }),
      global: true,
      inject: [ConfigService],
    }),

    // Configure MongoDB connection using the environment variable
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('database.connectionString'),
      }),
      inject: [ConfigService],
    }),

    // Import your custom modules
    AuthModule,
    RolesModule,
    TeacherModule,
    StudentModule,
    ExamModule,
    ExamAttemptModule,
    FavQuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
