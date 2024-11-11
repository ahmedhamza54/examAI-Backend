import { Test, TestingModule } from '@nestjs/testing';
import { FavQuestionsController } from './fav-questions.controller';
import { FavQuestionsService } from './fav-questions.service';

describe('FavQuestionsController', () => {
  let controller: FavQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavQuestionsController],
      providers: [FavQuestionsService],
    }).compile();

    controller = module.get<FavQuestionsController>(FavQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
