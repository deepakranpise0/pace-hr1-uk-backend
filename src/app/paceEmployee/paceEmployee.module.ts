import { Mongoose } from 'mongoose';

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { PaceEmployeeSchema } from './entities/paceEmployee.entity';
import { PaceEmployeeController } from './paceEmployee.controller';
import { PaceEmployeeService } from './paceEmployee.service';

@Module({
  imports: [DatabaseModule],
  exports:[PaceEmployeeService],
  controllers: [PaceEmployeeController],
  providers: [PaceEmployeeService,
      {
        provide: 'PACE_EMPLOYEE_MODEL',
        useFactory: (mongoose: Mongoose) =>
          mongoose.model('PaceEmployees', PaceEmployeeSchema),
        inject: ['DATABASE_CONNECTION'],
      },
    ]
})
export class PaceEmployeeModule {}
