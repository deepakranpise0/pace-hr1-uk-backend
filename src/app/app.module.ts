import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import {
  InterViewTemplateModule,
} from './interviewTemplate/interviewTemplate.module';
import { MasterModule } from './masterdata/masterdata.module';
import { PaceEmployeeModule } from './paceEmployee/paceEmployee.module';
import { QuestionsModule } from './questions/questions.module';
import {
  QuestionsFeedbackModule,
} from './questionsfeedback/questionsfeedback.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, PassportModule, MasterModule, UserModule, QuestionsModule, QuestionsFeedbackModule, InterViewTemplateModule,PaceEmployeeModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
