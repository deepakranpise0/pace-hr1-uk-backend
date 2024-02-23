import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import { PaceEmployeeController } from './paceEmployee.controller';

describe('PaceEmployeeController', () => {
  let controller: PaceEmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaceEmployeeController],
    }).compile();

    controller = module.get<PaceEmployeeController>(PaceEmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
