import moment from 'moment';
import * as mongoose from 'mongoose';
import {
  InterviewTemplateInterface,
  MasterDataId,
  QuestionsPerSections,
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
