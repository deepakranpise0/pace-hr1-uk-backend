import { Mongoose } from 'mongoose';

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { InterviewResponseSchema } from './entities/interviewResponse.entity';
import { InterviewResponseController } from './interviewResponse.controller';
import { InterviewResponseService } from './interviewResponse.service';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewResponseController],
  providers: [InterviewResponseService,
      {
        provide: 'INTERVIEW_Response_MODEL',
        useFactory: (mongoose: Mongoose) =>
          mongoose.model('interviewResponses', InterviewResponseSchema),
        inject: ['DATABASE_CONNECTION'],
      },
    ]
})
export class InterViewResponseModule {}
