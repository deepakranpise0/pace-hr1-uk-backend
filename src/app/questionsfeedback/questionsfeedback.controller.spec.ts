import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import { QuestionsFeedbackController } from './questionsfeedback.controller';

describe('QuestionsFeedbackController', () => {
  let controller: QuestionsFeedbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsFeedbackController],
    }).compile();

    controller = module.get<QuestionsFeedbackController>(QuestionsFeedbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
