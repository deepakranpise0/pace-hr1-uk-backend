import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import { InterviewResponseController } from './interviewResponse.controller';

describe('InterviewResponseController', () => {
  let controller: InterviewResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewResponseController],
    }).compile();

    controller = module.get<InterviewResponseController>(InterviewResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
