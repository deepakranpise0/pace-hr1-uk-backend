import { Mongoose } from 'mongoose';

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { InterviewTemplateSchema } from './entities/interviewTemplate.entity';
import { InterviewTemplateController } from './interviewTemplate.controller';
import { InterviewTemplateService } from './interviewTemplate.service';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewTemplateController],
  providers: [InterviewTemplateService,
      {
        provide: 'INTERVIEW_TEMPLATE_MODEL',
        useFactory: (mongoose: Mongoose) =>
          mongoose.model('interviewTemplates', InterviewTemplateSchema),
        inject: ['DATABASE_CONNECTION'],
      },
    ]
})
export class InterViewTemplateModule {}
