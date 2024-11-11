import { Test, TestingModule } from '@nestjs/testing';
import { FavQuestionsService } from './fav-questions.service';

describe('FavQuestionsService', () => {
  let service: FavQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavQuestionsService],
    }).compile();

    service = module.get<FavQuestionsService>(FavQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
