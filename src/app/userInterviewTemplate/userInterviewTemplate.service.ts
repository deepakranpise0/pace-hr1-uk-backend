import moment from 'moment';
import mongoose, { Model } from 'mongoose';

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import {
  CreateUserInterviewTemplateDto,
  GetUserInterviewTemplateDto,
  UpdateUserInterviewTemplateDto,
} from '../_dtos/Dtos';
import { UserInterviewTemplateInterface } from '../_types/Types';

@Injectable()
export class UserInterviewTemplateService {
   populateArray=[
     { path: 'userId', select: 'name email' }, 
     { path: 'domainId', select: 'name' },
     { path: 'assessmentId', select: 'name' },
     { path: 'questionsPerSection.sectionId', select: 'name' },
     { path: 'questionsPerSection.questionId.questionId', select: 'questions description' },
     { path: 'questionsPerSection.questionId.indicator', select: 'indicatorValue name' }
   ]
  
  constructor(
    @Inject('USER_INTERVIEW_TEMPLATE_MODEL')
    private readonly _UserInterviewTemplateModel: Model<UserInterviewTemplateInterface>
  ) { }
  
  async create(CreateUserInterviewTemplateDto: CreateUserInterviewTemplateDto): Promise<GetUserInterviewTemplateDto> {
    const createUserInterviewTemplate = await this._UserInterviewTemplateModel.create(CreateUserInterviewTemplateDto);
    if (!createUserInterviewTemplate) {
      throw new HttpException(
        'Error creating user interview template data.',
        HttpStatus.BAD_REQUEST
      );
    }
    return createUserInterviewTemplate;
  }
  
  async findAll(query: any) {
    const params = [];
    const data = await this.selectQuery(query, params);

    const findAllUserInterviewTemplate = await this._UserInterviewTemplateModel
      .find(data.findParams, data.projectParams, data.queryOptions)
      .populate(this.populateArray)
      .lean()
      .skip(parseInt(query.skip, 10) || 0)
      .limit(parseInt(query.limit, 10) || 0);
    if (!findAllUserInterviewTemplate) {
      throw new HttpException('User interview template data not found.', HttpStatus.NOT_FOUND);
    }
    return findAllUserInterviewTemplate;
  }

  async findOne(id: string) {
    const findOneUserInterviewTemplate = await this._UserInterviewTemplateModel
      .findOne({
        _id: new mongoose.Types.ObjectId(id),
        isDeleted: false,
      })
      .populate(this.populateArray)
      .lean();
    if (!findOneUserInterviewTemplate) {
      throw new HttpException('User interview template data not found.', HttpStatus.NOT_FOUND);
    }
    return findOneUserInterviewTemplate;
  }

  async update(id: string, UpdateUserInterviewTemplateDto: UpdateUserInterviewTemplateDto) {
    const findData = await this.findOne(id);
    if (!findData) {
      throw new HttpException('User interview template data not found.', HttpStatus.NOT_FOUND);
    } else {
      let { isActive, updatedAt, domainId, assessmentId, questionsPerSection, overallFeedback, pdfUrlLink, } = UpdateUserInterviewTemplateDto;
      domainId = domainId ? domainId : findData.domainId;
      assessmentId = assessmentId ? assessmentId : findData.assessmentId;
      questionsPerSection = questionsPerSection ? questionsPerSection : findData.questionsPerSection;
      overallFeedback = overallFeedback ? overallFeedback : findData.overallFeedback;
      pdfUrlLink = pdfUrlLink ? pdfUrlLink : findData.pdfUrlLink;
      isActive = isActive ? isActive : findData.isActive;
      updatedAt = moment().toISOString();
      const updatedUserInterviewTemplate = await this._UserInterviewTemplateModel.updateOne(
          { _id: new mongoose.Types.ObjectId(id) },
          UpdateUserInterviewTemplateDto
      );
      
      if (!updatedUserInterviewTemplate) {
          throw new HttpException(
          'User interview template data update failed.',
          HttpStatus.BAD_REQUEST
          );
      } else {
          return 'User interview template data updated successfully.';
      }
    }
  }

  async remove(id: string) {
    const removeUserInterviewTemplate = await this._UserInterviewTemplateModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { isDeleted: true }
    );
    if (!removeUserInterviewTemplate) {
      throw new HttpException(
        'User interview template data deletion failed.',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return 'User interview template data deleted successfully.';
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
