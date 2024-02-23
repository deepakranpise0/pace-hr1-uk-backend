import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MasterModule } from './masterdata/masterdata.module';
import { PaceEmployeeModule } from './paceEmployee/paceEmployee.module';
import { QuestionsModule } from './questions/questions.module';
import {
  QuestionsFeedbackModule,
} from './questionsfeedback/questionsfeedback.module';
import {
  UserInterViewTemplateModule,
} from './userInterviewTemplate/userInterviewTemplate.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, PassportModule, MasterModule, UserModule, QuestionsModule, QuestionsFeedbackModule, UserInterViewTemplateModule,PaceEmployeeModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
