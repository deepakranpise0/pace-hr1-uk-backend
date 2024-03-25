import { Mongoose } from 'mongoose';

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../users/users.module';
import { InterviewResponseSchema } from './entities/interviewResponse.entity';
import { InterviewResponseController } from './interviewResponse.controller';
import { InterviewResponseService } from './interviewResponse.service';

@Module({
  imports: [DatabaseModule,UserModule],
  controllers: [InterviewResponseController],
  providers: [InterviewResponseService,
      {
        provide: 'INTERVIEW_RESPONSE_MODEL',
        useFactory: (mongoose: Mongoose) =>
          mongoose.model('interviewResponses', InterviewResponseSchema),
        inject: ['DATABASE_CONNECTION'],
      },
    ]
})
export class InterViewResponseModule {}
