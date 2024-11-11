import { Test, TestingModule } from '@nestjs/testing';
import { ExamAttemptController } from './exam-attempt.controller';
import { ExamAttemptService } from './exam-attempt.service';

describe('ExamAttemptController', () => {
  let controller: ExamAttemptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamAttemptController],
      providers: [ExamAttemptService],
    }).compile();

    controller = module.get<ExamAttemptController>(ExamAttemptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
