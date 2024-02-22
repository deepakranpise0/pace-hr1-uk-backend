import moment = require('moment');
import * as mongoose from 'mongoose';
import { UserInterface } from 'src/app/_types/Types';

import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

export type RuleDocument = UsersData & mongoose.Document;

@Schema()
export class UsersData implements  UserInterface{
  @Prop()
  name: string;

  @Prop()
  email: string;
 
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

export const UserSchema = SchemaFactory.createForClass(UsersData);
