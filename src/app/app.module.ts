import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MasterModule } from './masterdata/masterdata.module';
import { QuestionsModule } from './questions/questions.module';
import {
  QuestionsFeedbackModule,
} from './questionsfeedback/questionsfeedback.module';
import {
  UserInterViewTemplateModule,
} from './userInterviewTemplate/userInterviewTemplate.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, MasterModule, UserModule, QuestionsModule, QuestionsFeedbackModule,UserInterViewTemplateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
