import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './auth/firebase.module';
import { DatabaseModule } from './database/database.module';
import {
  InterViewResponseModule,
} from './interviewResponse/interviewResponse.module';
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
  imports: [
    DatabaseModule,
    MasterModule,
    UserModule,
    QuestionsModule,
    QuestionsFeedbackModule,
    InterViewTemplateModule,
    InterViewResponseModule,
    PaceEmployeeModule,
    AuthModule,
    FirebaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
