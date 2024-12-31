import { Test, TestingModule } from '@nestjs/testing';
import { FavQuestionsController } from './fav-questions.controller';
import { FavQuestionsService } from './fav-questions.service';

describe('FavQuestionsController', () => {
  let controller: FavQuestionsController;

  beforeEach(async () => {
    const mockFavQuestionsService = {
      // Add mock implementations for any methods used in the controller
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavQuestionsController],
      providers: [
        {
          provide: FavQuestionsService,
          useValue: mockFavQuestionsService,
        },
      ],
    }).compile();

    controller = module.get<FavQuestionsController>(FavQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
