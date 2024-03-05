import moment from 'moment';
import mongoose, { Model } from 'mongoose';

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import {
  CreateInterviewResponseDto,
  GetInterviewResponseDto,
  UpdateInterviewResponseDto,
} from '../_dtos/Dtos';
import { InterviewResponseInterface } from '../_types/Types';

@Injectable()
export class InterviewResponseService {
   populateArray=[
     { path: 'domainId', select: 'name' },
     { path: 'assessmentId', select: 'name' },
     { path: 'questionsPerSection.sectionId', select: 'name' },
     { path: 'questionsPerSection.questionId.questionId', select: 'questions description' },
     { path: 'questionsPerSection.questionId.indicator', select: 'indicatorValue name' }
   ]
  
  constructor(
    @Inject('INTERVIEW_TEMPLATE_MODEL')
    private readonly _InterviewResponseModel: Model<InterviewResponseInterface>
  ) { }
  
  async create(CreateInterviewResponseDto: CreateInterviewResponseDto): Promise<GetInterviewResponseDto> {
    const createInterviewResponse = await this._InterviewResponseModel.create(CreateInterviewResponseDto);
    if (!createInterviewResponse) {
      throw new HttpException(
        'Error creating user interview response data.',
        HttpStatus.BAD_REQUEST
      );
    }
    return createInterviewResponse;
  }
  
  async findAll(query: any) {
    const params = [];
    const data = await this.selectQuery(query, params);

    const findAllInterviewResponse = await this._InterviewResponseModel
      .find(data.findParams, data.projectParams, data.queryOptions)
      .populate(this.populateArray)
      .lean()
      .skip(parseInt(query.skip, 10) || 0)
      .limit(parseInt(query.limit, 10) || 0);
    if (!findAllInterviewResponse) {
      throw new HttpException('User interview response data not found.', HttpStatus.NOT_FOUND);
    }
    return findAllInterviewResponse;
  }

  async findOne(id: string) {
    const findOneInterviewResponse = await this._InterviewResponseModel
      .findOne({
        _id: new mongoose.Types.ObjectId(id),
        isDeleted: false,
      })
      .populate(this.populateArray)
      .lean();
    if (!findOneInterviewResponse) {
      throw new HttpException('User interview response data not found.', HttpStatus.NOT_FOUND);
    }
    return findOneInterviewResponse;
  }

  async update(id: string, UpdateInterviewResponseDto: UpdateInterviewResponseDto) {
    const findData = await this.findOne(id);
    if (!findData) {
      throw new HttpException('User interview response data not found.', HttpStatus.NOT_FOUND);
    } else {
      let { isActive, templateId,updatedAt, userId, questionsPerSection } = UpdateInterviewResponseDto;
      templateId = templateId ? templateId : findData.templateId;
      userId = userId ? userId : findData.userId;
      questionsPerSection = questionsPerSection ? questionsPerSection : findData.questionsPerSection;
      isActive = isActive ? isActive : findData.isActive;
      updatedAt = moment().toISOString();
      const updatedInterviewResponse = await this._InterviewResponseModel.updateOne(
          { _id: new mongoose.Types.ObjectId(id) },
          UpdateInterviewResponseDto
      );
      
      if (!updatedInterviewResponse) {
          throw new HttpException(
          'User interview response data update failed.',
          HttpStatus.BAD_REQUEST
          );
      } else {
          return 'User interview response data updated successfully.';
      }
    }
  }

  async remove(id: string) {
    const removeInterviewResponse = await this._InterviewResponseModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { isDeleted: true }
    );
    if (!removeInterviewResponse) {
      throw new HttpException(
        'User interview response data deletion failed.',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return 'User interview response data deleted successfully.';
    }
  }

  selectQuery(data, params) {
    const projectParams = {};
    params.forEach((param) => {
      projectParams[param] = 1;
    });
    const query = {
      findParams: {},
      projectParams,
      queryOptions: {},
    };

    if (data && data.search) {
      if (data.searchField) {
        const splitData = data.searchField.split(',');
        const new_query = [];
        splitData.forEach((e) => {
          const NewSubQuery = {};
          if (e.includes('_id')) {
            NewSubQuery[e] = new mongoose.Types.ObjectId(data.search);
            
          } else if (e !== 'isActive') {
            NewSubQuery[e] = { $regex: data.search, $options: 'i' };
          }
          new_query.push(NewSubQuery);
        });
        query.findParams = { $or: new_query };
      } else {
        const searchQuery = {};
        params.forEach((param) => {
          if (param !== 'isActive')
            searchQuery[param] = { $regex: data.search, $options: 'i' };
        });
        query.findParams = {
          $or: [searchQuery],
        };
      }
    }
    if (data && data.sortBy) {
      const value = {};
      if (data.sort) value[data.sortBy] = parseInt(data.sort, 10);
      else value[data.sortBy] = 1;
      query.queryOptions = { sort: value };
    }
    // query.findParams={ isActive:true };
    return query;
  }
}
