import { Mongoose } from 'mongoose';

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import {
  QuestionsFeedbackDataSchema,
} from './entities/questionsfeedback.entity';
import { QuestionsFeedbackController } from './questionsfeedback.controller';
import { QuestionsFeedbackService } from './questionsfeedback.service';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionsFeedbackController],
  providers: [QuestionsFeedbackService,
      {
        provide: 'QUESTIONS_FEEDBACK_MODEL',
        useFactory: (mongoose: Mongoose) =>
          mongoose.model('questionfeedbacks', QuestionsFeedbackDataSchema),
        inject: ['DATABASE_CONNECTION'],
      },
    ]
})
export class QuestionsFeedbackModule {}
