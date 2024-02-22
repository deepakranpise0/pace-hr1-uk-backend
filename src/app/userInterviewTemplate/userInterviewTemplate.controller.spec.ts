import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import {
  UserInterviewTemplateController,
} from './userInterviewTemplate.controller';

describe('UserInterviewTemplateController', () => {
  let controller: UserInterviewTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInterviewTemplateController],
    }).compile();

    controller = module.get<UserInterviewTemplateController>(UserInterviewTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
