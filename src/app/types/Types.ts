import mongoose from 'mongoose';

export enum MASTER_DATA{
    DOMAINS="domains",
    ASSESSMENT_TYPES="assessment_type",
    SECTIONS="sections",
    INDICATORS="indicators"
}



export declare interface masterDataInterface{
    _id?:mongoose.Types.ObjectId
    name: string;
    description?: string;
    email?: string;
    masterDataType:MASTER_DATA;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
} 