import { Mongoose } from 'mongoose';

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { QuestionSchema } from './entities/questions.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionsController],
  providers: [QuestionsService,
      {
        provide: 'QUESTIONS_MODEL',
        useFactory: (mongoose: Mongoose) =>
          mongoose.model('Questions', QuestionSchema),
        inject: ['DATABASE_CONNECTION'],
      },
    ]
})
export class QuestionsModule {}
