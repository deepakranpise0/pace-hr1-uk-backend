import moment from 'moment';
import * as mongoose from 'mongoose';
import {
  MasterDataId,
  QuestionsPerSections,
  User,
  UserInterviewTemplateInterface,
} from 'src/app/_types/Types';

import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

export type RuleDocument = UserInterviewTemplate & mongoose.Document;

@Schema()
export class UserInterviewTemplate implements UserInterviewTemplateInterface {
  @Prop({type:mongoose.Schema.Types.ObjectId,ref: 'users',required:true}) 
  userId: User;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref: 'masterdatas',required:true})  
  domainId: MasterDataId;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref: 'masterdatas',required:true})  
  assessmentId: MasterDataId;

  @Prop({
    type: [{
      sectionId: { type: mongoose.Schema.Types.ObjectId,ref: 'masterdatas'},
      questionId: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'questions' },
        indicator: { type: mongoose.Schema.Types.ObjectId, ref: 'masterdatas' }
      }],
      notes:String
    }],required:true })
  questionsPerSection: [QuestionsPerSections];

  @Prop()
  overallFeedback: string;

  @Prop()
  pdfUrlLink: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: moment().toISOString() })
  createdAt: string;

  @Prop({ default: moment().toISOString() })
  updatedAt: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;
}

export const UserInterviewTemplateSchema = SchemaFactory.createForClass(UserInterviewTemplate);
