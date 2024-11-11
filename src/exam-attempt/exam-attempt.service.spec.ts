import { Test, TestingModule } from '@nestjs/testing';
import { ExamAttemptService } from './exam-attempt.service';

describe('ExamAttemptService', () => {
  let service: ExamAttemptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamAttemptService],
    }).compile();

    service = module.get<ExamAttemptService>(ExamAttemptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
