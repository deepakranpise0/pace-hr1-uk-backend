import moment from 'moment';
import * as mongoose from 'mongoose';
import {
  InterviewResponseInterface,
  QuestionsPerSections,
} from 'src/app/_types/Types';

import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

export type RuleDocument = InterviewResponse & mongoose.Document;

@Schema()
export class InterviewResponse implements InterviewResponseInterface {

 
  @Prop({type:mongoose.Schema.Types.ObjectId,ref: 'users',required:true}) 
  userId:mongoose.Schema.Types.ObjectId ;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref: 'interviewTemplates',required:true})  
  templateId: mongoose.Types.ObjectId;

  @Prop()  
  pdfUrlLink: string;

  @Prop({
    type: [{
      sectionId: { type: mongoose.Schema.Types.ObjectId,ref: 'masterdatas'},
      questionId: [{
        low: String,
        high: { type: mongoose.Schema.Types.ObjectId,ref: 'questions'},
        indicator: { type: mongoose.Schema.Types.ObjectId, ref: 'masterdatas' }
      }],
      notes:String
    }],required:true })
  questionsPerSection: [QuestionsPerSections];

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

export const InterviewResponseSchema = SchemaFactory.createForClass(InterviewResponse);
