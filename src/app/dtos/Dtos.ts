import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

import {
  MASTER_DATA,
  masterDataInterface,
} from '../types/Types';

export class CreateMasterDto implements masterDataInterface {
  
  @IsString()
  name: string;
  
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  masterDataType:MASTER_DATA;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isDeleted: boolean;

  @IsOptional()
  createdAt: string;

  @IsOptional()
  createdBy: string;

  @IsOptional()
  updatedAt: string;
  
  @IsOptional()
  updatedBy: string;
}

export class UpdateMasterDto extends CreateMasterDto implements masterDataInterface {   
  @IsOptional()
  updatedAt:  string;
}

export class GetMasterDto extends UpdateMasterDto { 
  _id?: mongoose.Types.ObjectId
}
  