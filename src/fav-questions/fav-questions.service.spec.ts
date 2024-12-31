import { Test, TestingModule } from '@nestjs/testing';
import { FavQuestionsService } from './fav-questions.service';

describe('FavQuestionsService', () => {
  let service: FavQuestionsService;

  beforeEach(async () => {
    const mockFavQuestionsModel = {}; // Mock implementation for FavQuestionsModel

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavQuestionsService,
        {
          provide: 'FavQuestionsModel', // Use the same token used in your service's constructor
          useValue: mockFavQuestionsModel,
        },
      ],
    }).compile();

    service = module.get<FavQuestionsService>(FavQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
