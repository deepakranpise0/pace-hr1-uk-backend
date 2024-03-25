import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

import {
  InterviewResponseInterface,
  InterviewTemplateInterface,
  MASTER_DATA,
  MasterDataId,
  masterDataInterface,
  PaceEmployeeInterface,
  Question,
  QuestionFeedbackInterface,
  QuestionInterface,
  QuestionsPerSectionForTemplate,
  QuestionsPerSections,
  ROLE,
  UserInterface,
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
  name: string;

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
export class CreateInterviewTemplateDto implements InterviewTemplateInterface {

  @IsString()
  templateName: string;

  @IsMongoId()
  domainId: MasterDataId;

  @IsMongoId()
  assessmentId: MasterDataId;

  @IsArray()
  questionsPerSection: [QuestionsPerSectionForTemplate];

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
export class UpdateInterviewTemplateDto extends CreateInterviewTemplateDto implements InterviewTemplateInterface {  
  @IsOptional()
  updatedAt:  string;
}
export class GetInterviewTemplateDto extends UpdateInterviewTemplateDto { 
  _id?: mongoose.Types.ObjectId
}
//#EndRegion

//#User
export class CreatePaceEmployeeDto implements PaceEmployeeInterface {
 
  @IsString()
  password: string;
  
  @IsString()
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  // @IsUnique({ message: 'Email already exists' }) ://TODO : to be add
  email: string;

  @IsString()
  @IsNotEmpty()
  role:ROLE;

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
export class UpdatePaceEmployeeDto extends CreatePaceEmployeeDto implements PaceEmployeeInterface {   
  @IsOptional()
  updatedAt:  string;
}
export class GetPaceEmployeeDto extends UpdatePaceEmployeeDto { 
  _id?: mongoose.Types.ObjectId
}
//#endregion

//#User Interview Template
export class CreateInterviewResponseDto implements InterviewResponseInterface {
  @IsMongoId()
  userId: mongoose.Schema.Types.ObjectId;

  @IsMongoId()
  templateId: mongoose.Types.ObjectId;
  
  @IsString()
  @IsOptional()
  pdfUrlLink: string;

  @IsArray()
  questionsPerSection: [QuestionsPerSections];

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
export class UpdateInterviewResponseDto extends CreateInterviewResponseDto implements InterviewResponseInterface {  
  @IsOptional()
  updatedAt:  string;
}
export class GetInterviewResponseDto extends UpdateInterviewResponseDto { 
  _id?: mongoose.Types.ObjectId
}
//#EndRegion



  
  