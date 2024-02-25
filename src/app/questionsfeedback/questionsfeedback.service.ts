import moment from 'moment';
import mongoose, { Model } from 'mongoose';

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import {
  CreateQuestionsFeedbackDto,
  GetQuestionsFeedbackDto,
  UpdateQuestionsFeedbackDto,
} from '../_dtos/Dtos';
import { QuestionFeedbackInterface } from '../_types/Types';

@Injectable()
export class QuestionsFeedbackService {
  populateArray = [{ path: 'questionsPerSection.sectionId', select: 'name' }];

  constructor(
    @Inject('QUESTIONS_FEEDBACK_MODEL')
    private readonly _QuestionFeedbackModel: Model<QuestionFeedbackInterface>
  ) { }
  
  async createQuestionData(CreateQuestionsFeedbackDto: CreateQuestionsFeedbackDto): Promise<GetQuestionsFeedbackDto> {
    const createQuestionData = await this._QuestionFeedbackModel.create(CreateQuestionsFeedbackDto);
    if (!createQuestionData) {
      throw new HttpException(
        'Error creating Question Feedback data.',
        HttpStatus.BAD_REQUEST
      );
    }
    return createQuestionData;
  }
  
  async findAll(query: any) {
    console.log("Question Feedback Data")
    const params = [];
    const data = await this.selectQuery(query, params);

    const findAllQuestionData = await this._QuestionFeedbackModel
      .find(data.findParams, data.projectParams, data.queryOptions)
      .populate(this.populateArray)
      .lean()
      .skip(parseInt(query.skip, 10) || 0)
      .limit(parseInt(query.limit, 10) || 0);
    if (!findAllQuestionData) {
      throw new HttpException('Question Feedback data not found.', HttpStatus.NOT_FOUND);
    }
    return findAllQuestionData;
  }

  async findOne(id: string) {
    const findOneQuestionsFeedback = await this._QuestionFeedbackModel
      .findOne({
        _id: new mongoose.Types.ObjectId(id),
        isDeleted: false,
      })
      .populate(this.populateArray)
      .lean();
    if (!findOneQuestionsFeedback) {
      throw new HttpException('Question Feedback data not found.', HttpStatus.NOT_FOUND);
    }
    return findOneQuestionsFeedback;
  }

  async update(id: string, UpdateQuestionsFeedbackDto: UpdateQuestionsFeedbackDto) {
    const findData = await this.findOne(id);
    if (!findData) {
      throw new HttpException('Question Feedback data not found.', HttpStatus.NOT_FOUND);
    } else {
      let { feedback,indicatorValue,isActive, updatedAt } = UpdateQuestionsFeedbackDto;
      isActive = isActive ? isActive : findData.isActive;
      feedback = feedback ? feedback : findData.feedback;
      indicatorValue = indicatorValue ? indicatorValue : findData.indicatorValue;
      updatedAt = moment().toISOString();
      const updatedQuestionsFeedback = await this._QuestionFeedbackModel.updateOne(
          { _id: new mongoose.Types.ObjectId(id) },
          UpdateQuestionsFeedbackDto
      );
      
      if (!updatedQuestionsFeedback) {
          throw new HttpException(
          'Question Feedback data update failed.',
          HttpStatus.BAD_REQUEST
          );
      } else {
          return 'Question Feedback data updated successfully.';
      }
    }
  }

  async remove(id: string) {
    const removeQuestionsFeedback = await this._QuestionFeedbackModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { isDeleted: true }
    );
    if (!removeQuestionsFeedback) {
      throw new HttpException(
        'Question Feedback data deletion failed.',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return 'Question Feedback data deleted successfully.';
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
    return query;
  }
}
