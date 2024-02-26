import moment from 'moment';
import * as mongoose from 'mongoose';
import {
  MasterDataId,
  QuestionInterface,
} from 'src/app/_types/Types';

import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

export type RuleDocument = QuestionsData & mongoose.Document;

@Schema()
export class QuestionsData implements QuestionInterface {
  @Prop({required:true})
    questions: string;

    @Prop()
    description: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'masterdatas' ,required:true})  
    sectionId: MasterDataId;

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

export const QuestionSchema = SchemaFactory.createForClass(QuestionsData);
