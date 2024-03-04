import mongoose from 'mongoose';

export enum MASTER_DATA{
    DOMAIN="domain",
    ASSESSMENT_TYPES="assessmentType",
    SECTIONS="section",
    INDICATORS="indicators"
}

export enum ROLE { 
    ADMIN = 'admin',
    INTERVIEWER='interviewer'
}

export type QuestionsPerSections = {
    sectionId:MasterDataId
    questionId: [Questions],
    notes:string
}

export type Questions={
    questionId: MasterDataId,
    indicator: MasterDataId, 
}

export declare interface masterDataInterface{
    _id?:mongoose.Types.ObjectId
    name: string;
    description?: string;
    indicatorValue?: number;
    masterDataType:MASTER_DATA;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
} 
export declare interface MasterDataId {
  type: { type: mongoose.Schema.Types.ObjectId; ref: 'masterdatas' };
}

export declare interface UserInterface{
    _id?:mongoose.Types.ObjectId
    name: string;
    email?: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
} 

export declare interface PaceEmployeeInterface{
    _id?:mongoose.Types.ObjectId
    name: string;
    email: string;
    password: string;
    role: ROLE;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}


export declare interface QuestionInterface{
    _id?:mongoose.Types.ObjectId
    name: string;
    description?: string;
    sectionId: MasterDataId,
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}

export declare interface QuestionFeedbackInterface{
    _id?:mongoose.Types.ObjectId
    questionsId: Question;
    indicatorValue: number;
    feedback: string,
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}

export declare interface Question {
  type: { type: mongoose.Schema.Types.ObjectId; ref: 'Questions' };
}

export declare interface User {
  type: { type: mongoose.Schema.Types.ObjectId; ref: 'Users' };
}

export declare interface InterviewTemplateInterface{
    _id?: mongoose.Types.ObjectId,
    templateName:string,
    domainId: MasterDataId;
    assessmentId: MasterDataId,
    questionsPerSection: [QuestionsPerSections],
    // overallFeedback: string,
    // pdfUrlLink: string,
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}




