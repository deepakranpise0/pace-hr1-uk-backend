import mongoose from 'mongoose';

export enum MASTER_DATA{
    DOMAIN="domain",
    ASSESSMENT_TYPES="assessmentType",
    SECTIONS="sections",
    INDICATORS="indicators"
}

export type QuestionsPerSections={
    questionId: Question,
    indicatorValue: MasterDataId,   
}

export type SectionDetails={
    sectionId: MasterDataId,
    notes:string
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

export declare interface QuestionInterface{
    _id?:mongoose.Types.ObjectId
    questions: string;
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

export declare interface UserInterviewTemplateInterface{
    _id?:mongoose.Types.ObjectId
    userId: User;
    domainId: MasterDataId;
    assessmentId: MasterDataId,
    sectionDetails: SectionDetails,
    questionsPerSection: QuestionsPerSections[],
    overallFeedback: string,
    pdfUrlLink: string,
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}




