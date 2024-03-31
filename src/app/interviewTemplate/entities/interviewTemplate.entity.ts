import moment from 'moment';
import * as mongoose from 'mongoose';
import {
  InterviewTemplateInterface,
  MasterDataId,
  QuestionsPerSectionForTemplate,
} from 'src/app/_types/Types';

import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

export type RuleDocument = InterviewTemplate & mongoose.Document;

@Schema()
export class InterviewTemplate implements InterviewTemplateInterface {
  @Prop({type:String,required:true}) 
  templateName:string ;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref: 'masterdatas',required:true})  
  domainId: MasterDataId;

  @Prop({
    type: [{
      assessmentId: { type: mongoose.Schema.Types.ObjectId,ref: 'masterdatas'},
      sectionId: { type: mongoose.Schema.Types.ObjectId,ref: 'masterdatas'},
      questionId: [ { type: mongoose.Schema.Types.ObjectId, ref: 'questions' }]
    }],required:true })
  questionsPerSection: [QuestionsPerSectionForTemplate];

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

export const InterviewTemplateSchema = SchemaFactory.createForClass(InterviewTemplate);
