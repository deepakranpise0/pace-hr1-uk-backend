import moment from 'moment';
import * as mongoose from 'mongoose';
import {
  MasterDataId,
  Question,
  QuestionFeedbackInterface,
} from 'src/app/_types/Types';

import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

export type RuleDocument = QuestionsFeedbackData & mongoose.Document;

@Schema()
export class QuestionsFeedbackData implements QuestionFeedbackInterface {
  @Prop({ type: String })
  questionsId: Question;

  @Prop()
  indicatorValue: number;

  @Prop()
  feedback: string;

  @Prop({type:String})  
  sectionId: MasterDataId;

  @Prop({ default: false })
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

export const QuestionsFeedbackDataSchema = SchemaFactory.createForClass(QuestionsFeedbackData);
