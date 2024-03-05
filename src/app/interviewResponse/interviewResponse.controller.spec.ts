import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import { InterviewTemplateController } from './interviewTemplate.controller';

describe('InterviewTemplateController', () => {
  let controller: InterviewTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewTemplateController],
    }).compile();

    controller = module.get<InterviewTemplateController>(InterviewTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
