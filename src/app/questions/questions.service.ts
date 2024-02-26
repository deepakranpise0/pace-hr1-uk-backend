import moment from 'moment';
import mongoose, { Model } from 'mongoose';

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import {
  CreateQuestionsDto,
  GetQuestionsDto,
  UpdateQuestionsDto,
} from '../_dtos/Dtos';
import { QuestionInterface } from '../_types/Types';

@Injectable()
export class QuestionsService {
    populateArray = [{ path: 'sectionId', select: 'name' }];

  constructor(
    @Inject('QUESTIONS_MODEL')
    private readonly QuestionModel: Model<QuestionInterface>
  ) { }
  
  async createQuestionData(createQuestionsDto: CreateQuestionsDto): Promise<GetQuestionsDto> {
    const createQuestionData = await this.QuestionModel.create(createQuestionsDto);
    if (!createQuestionData) {
      throw new HttpException(
        'Error creating Question data.',
        HttpStatus.BAD_REQUEST
      );
    }
    return createQuestionData;
  }
  
  async findAll(query: any) {
    const params = [];
    const data = await this.selectQuery(query, params);

    const findAllQuestionData = await this.QuestionModel
      .find(data.findParams, data.projectParams, data.queryOptions)
      .populate(this.populateArray)
      .lean()
      .skip(parseInt(query.skip, 10) || 0)
      .limit(parseInt(query.limit, 10) || 0);
    if (!findAllQuestionData) {
      throw new HttpException('Question data not found.', HttpStatus.NOT_FOUND);
    }
    return findAllQuestionData;
  }

  async findOne(id: string) {
    const findOneDeviceType = await this.QuestionModel
      .findOne({
        _id: new mongoose.Types.ObjectId(id),
        isDeleted: false,
      })
      .populate(this.populateArray)
      .lean();
    if (!findOneDeviceType) {
      throw new HttpException('Question data not found.', HttpStatus.NOT_FOUND);
    }
    return findOneDeviceType;
  }

  async update(id: string, updateQuestionsDto: UpdateQuestionsDto) {
    const findData = await this.findOne(id);
    if (!findData) {
      throw new HttpException('Question data not found.', HttpStatus.NOT_FOUND);
    } else {
        let { sectionId, name, isActive, updatedAt, description } = updateQuestionsDto;
        sectionId = sectionId ? sectionId : findData.sectionId;
        name = name ? name : findData.name
        description = description ? description : findData.description
        isActive = isActive ? isActive : findData.isActive;
        updatedAt = moment().toISOString();
        const updatedDeviceType = await this.QuestionModel.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            updateQuestionsDto
        );
        
        if (!updatedDeviceType) {
            throw new HttpException(
            'Question data update failed.',
            HttpStatus.BAD_REQUEST
            );
        } else {
            return 'Question data updated successfully.';
        }
    }
  }

  async remove(id: string) {
    const removeDeviceType = await this.QuestionModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { isDeleted: true }
    );
    if (!removeDeviceType) {
      throw new HttpException(
        'Question data deletion failed.',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return 'Question data deleted successfully.';
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
