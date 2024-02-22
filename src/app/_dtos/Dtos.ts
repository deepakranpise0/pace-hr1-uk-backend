import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

import {
  MASTER_DATA,
  MasterDataId,
  masterDataInterface,
  Question,
  QuestionFeedbackInterface,
  QuestionInterface,
  QuestionsPerSections,
  SectionDetails,
  User,
  UserInterface,
  UserInterviewTemplateInterface,
} from '../_types/Types';
import { IsMongoId } from './Constraints';

//#Master Data
export class CreateMasterDto implements masterDataInterface {
  
  @IsString()
  name: string;
  
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  indicatorValue?: number;

  @IsString()
  @IsNotEmpty()
  masterDataType:MASTER_DATA;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
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
//#endregion

//#User
export class CreateUserDto implements UserInterface {
  
  @IsString()
  name: string;

  @IsString()
  email?: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
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

export class UpdateUserDto extends CreateUserDto implements UserInterface {   
  @IsOptional()
  updatedAt:  string;
}

export class GetUserDto extends UpdateUserDto { 
  _id?: mongoose.Types.ObjectId
}
//#endregion  

//#Questions
export class CreateQuestionsDto implements QuestionInterface {
  
  @IsMongoId()
  sectionId: MasterDataId;
  
  @IsString()
  questions: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
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

export class UpdateQuestionsDto extends CreateQuestionsDto implements QuestionInterface {   
  @IsOptional()
  updatedAt:  string;
}

export class GetQuestionsDto extends UpdateQuestionsDto { 
  _id?: mongoose.Types.ObjectId
}
//#endregion

//#Questions Feedback
export class CreateQuestionsFeedbackDto implements QuestionFeedbackInterface {
  
  @IsMongoId()
  questionsId: Question;
  
  @IsString()
  feedback: string;

  @IsNumber()
  indicatorValue: number;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
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

export class UpdateQuestionsFeedbackDto extends CreateQuestionsFeedbackDto implements QuestionFeedbackInterface {   
  @IsOptional()
  updatedAt:  string;
}

export class GetQuestionsFeedbackDto extends UpdateQuestionsFeedbackDto { 
  _id?: mongoose.Types.ObjectId
}
//#endregion

//#User Assessment Template
export class CreateUserInterviewTemplateDto implements UserInterviewTemplateInterface {

  @IsString()
  userId: User;

  @IsString()
  domainId: MasterDataId;

  @IsString()
  assessmentId: MasterDataId;

  @IsObject()
  sectionDetails: SectionDetails;

  @IsArray()
  questionsPerSection: QuestionsPerSections[];
  
  @IsString()
  @IsOptional()
  overallFeedback: string;
  
  @IsString()
  @IsOptional()
  pdfUrlLink: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
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

export class UpdateUserInterviewTemplateDto extends CreateUserInterviewTemplateDto implements UserInterviewTemplateInterface {  
  @IsOptional()
  updatedAt:  string;
}

export class GetUserInterviewTemplateDto extends UpdateUserInterviewTemplateDto { 
  _id?: mongoose.Types.ObjectId
}
//#EndRegion



  
  