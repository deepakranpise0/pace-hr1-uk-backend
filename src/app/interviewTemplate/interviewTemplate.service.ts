import moment from 'moment';
import mongoose, { Model } from 'mongoose';

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import {
  CreateInterviewTemplateDto,
  GetInterviewTemplateDto,
  UpdateInterviewTemplateDto,
} from '../_dtos/Dtos';
import { InterviewTemplateInterface } from '../_types/Types';

@Injectable()
export class InterviewTemplateService {
   populateArray=[
     { path: 'domainId', select: 'name' },
     { path: 'questionsPerSection.sectionId', select: 'name' },
     { path: 'questionsPerSection.questionId', select: 'name description' },
   ]
  
  constructor(
    @Inject('INTERVIEW_TEMPLATE_MODEL')
    private readonly _InterviewTemplateModel: Model<InterviewTemplateInterface>
  ) { }
  
  async create(CreateInterviewTemplateDto: CreateInterviewTemplateDto): Promise<GetInterviewTemplateDto> {
    const createInterviewTemplate = await this._InterviewTemplateModel.create(CreateInterviewTemplateDto);
    if (!createInterviewTemplate) {
      throw new HttpException(
        'Error creating user interview template data.',
        HttpStatus.BAD_REQUEST
      );
    }
    return createInterviewTemplate;
  }
  
  async findAll(query: any) {
    const params = [];
    const data = await this.selectQuery(query, params);

    const findAllInterviewTemplate = await this._InterviewTemplateModel
      .find(data.findParams, data.projectParams, data.queryOptions)
      .populate(this.populateArray)
      .lean()
      .skip(parseInt(query.skip, 10) || 0)
      .limit(parseInt(query.limit, 10) || 0);
    if (!findAllInterviewTemplate) {
      throw new HttpException('User interview template data not found.', HttpStatus.NOT_FOUND);
    }
    return findAllInterviewTemplate;
  }

  async findOne(id: string) {
    const findOneInterviewTemplate = await this._InterviewTemplateModel
      .findOne({
        _id: new mongoose.Types.ObjectId(id),
        isDeleted: false,
      })
      .populate(this.populateArray)
      .lean();
    if (!findOneInterviewTemplate) {
      throw new HttpException('User interview template data not found.', HttpStatus.NOT_FOUND);
    }
    return findOneInterviewTemplate;
  }

  async update(id: string, UpdateInterviewTemplateDto: UpdateInterviewTemplateDto) {
    const findData = await this.findOne(id);
    if (!findData) {
      throw new HttpException('User interview template data not found.', HttpStatus.NOT_FOUND);
    } else {
      let { isActive, templateName,updatedAt, domainId, questionsPerSection } = UpdateInterviewTemplateDto;
      templateName = templateName ? templateName : findData.templateName;
      domainId = domainId ? domainId : findData.domainId;
      questionsPerSection = questionsPerSection ? questionsPerSection : findData.questionsPerSection;
      isActive = isActive ? isActive : findData.isActive;
      updatedAt = moment().toISOString();
      const updatedInterviewTemplate = await this._InterviewTemplateModel.updateOne(
          { _id: new mongoose.Types.ObjectId(id) },
          UpdateInterviewTemplateDto
      );
      
      if (!updatedInterviewTemplate) {
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
    const removeInterviewTemplate = await this._InterviewTemplateModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { isDeleted: true }
    );
    if (!removeInterviewTemplate) {
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
