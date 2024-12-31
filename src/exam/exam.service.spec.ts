import { Test, TestingModule } from '@nestjs/testing';
import { ExamService } from './exam.service';

describe('ExamService', () => {
  let service: ExamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ExamService,
          useValue: {
            // Mock methods and properties as needed
          },
        },
      ],
    }).compile();

    service = module.get<ExamService>(ExamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
