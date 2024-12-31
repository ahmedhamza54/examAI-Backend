import { Test, TestingModule } from '@nestjs/testing';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';

describe('ExamController', () => {
  let controller: ExamController;
  let service: ExamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamController],
      providers: [
        {
          provide: ExamService,
          useValue: {
            // Mock methods and properties as needed
          },
        },
      ],
    }).compile();

    controller = module.get<ExamController>(ExamController);
    service = module.get<ExamService>(ExamService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
