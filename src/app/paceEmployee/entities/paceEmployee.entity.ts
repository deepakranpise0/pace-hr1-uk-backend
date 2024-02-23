import moment = require('moment');
import * as mongoose from 'mongoose';
import {
  PaceEmployeeInterface,
  ROLE,
} from 'src/app/_types/Types';

import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

export type RuleDocument = PaceEmployeesData & mongoose.Document;

@Schema()
export class PaceEmployeesData implements  PaceEmployeeInterface{
  
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ type: String, enum: Object.values(ROLE), required: true })
  role: ROLE;
 
 
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

export const PaceEmployeeSchema = SchemaFactory.createForClass(PaceEmployeesData);
