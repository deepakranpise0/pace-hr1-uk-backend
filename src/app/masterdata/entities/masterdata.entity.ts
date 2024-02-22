import moment = require('moment');
import * as mongoose from 'mongoose';
import {
  MASTER_DATA,
  masterDataInterface,
} from 'src/app/_types/Types';

import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

export type RuleDocument = MasterData & mongoose.Document;

@Schema()
export class MasterData implements  masterDataInterface{
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  indicatorValue: number;

  @Prop({ type: String, enum: Object.values(MASTER_DATA), required: true })
  masterDataType: MASTER_DATA;
 
  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: moment().toISOString() })
  createdAt: string;

  @Prop({ default: moment().toISOString() })
  updatedAt: string;

  @Prop({default:false})
  isDeleted: boolean;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;
}

export const MasterDataSchema = SchemaFactory.createForClass(MasterData);
