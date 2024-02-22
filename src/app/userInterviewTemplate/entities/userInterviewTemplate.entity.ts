import moment from 'moment';
import * as mongoose from 'mongoose';
import {
  MasterDataId,
  QuestionsPerSections,
  SectionDetails,
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
  @Prop({type:mongoose.Types.ObjectId})
  userId: User;

  @Prop({ type: mongoose.Types.ObjectId })
  domainId: MasterDataId;

  @Prop({ type: mongoose.Types.ObjectId })
  assessmentId: MasterDataId;

  @Prop({ type: Object })
  sectionDetails: SectionDetails;

  @Prop({ type: [] })
  questionsPerSection: QuestionsPerSections[];

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
