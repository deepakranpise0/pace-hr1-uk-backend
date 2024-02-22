import { Mongoose } from 'mongoose';

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import {
  UserInterviewTemplateSchema,
} from './entities/userInterviewTemplate.entity';
import {
  UserInterviewTemplateController,
} from './userInterviewTemplate.controller';
import { UserInterviewTemplateService } from './userInterviewTemplate.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserInterviewTemplateController],
  providers: [UserInterviewTemplateService,
      {
        provide: 'USER_INTERVIEW_TEMPLATE_MODEL',
        useFactory: (mongoose: Mongoose) =>
          mongoose.model('UserInterviewTemplates', UserInterviewTemplateSchema),
        inject: ['DATABASE_CONNECTION'],
      },
    ]
})
export class UserInterViewTemplateModule {}
