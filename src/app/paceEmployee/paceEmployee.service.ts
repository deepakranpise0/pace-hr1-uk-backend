import bcrypt from 'bcrypt';
import moment from 'moment';
import mongoose, { Model } from 'mongoose';

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import {
  CreatePaceEmployeeDto,
  GetPaceEmployeeDto,
  UpdatePaceEmployeeDto,
} from '../_dtos/Dtos';
import { PaceEmployeeInterface } from '../_types/Types';

@Injectable()
export class PaceEmployeeService {
  saltRounds = 10;
  constructor(
    @Inject('PACE_EMPLOYEE_MODEL')
    private readonly PaceEmployeeModel: Model<PaceEmployeeInterface>
  ) { }
  
  async createPaceEmployeeData(createPaceEmployeeDto: CreatePaceEmployeeDto): Promise<GetPaceEmployeeDto> {
    try {
       createPaceEmployeeDto.password=await bcrypt.hash(createPaceEmployeeDto.password, this.saltRounds)
      const createPaceEmployeeData = await this.PaceEmployeeModel.create(createPaceEmployeeDto);
      if (!createPaceEmployeeData) {
        throw new HttpException(
          'Error creating PaceEmployee data.',
          HttpStatus.BAD_REQUEST
        );
      }
      return createPaceEmployeeData;
    } catch (error) {
       throw new HttpException(
          'Error creating pace employee check email id.',
          HttpStatus.BAD_REQUEST
        );
    }
   
  }
  
  async findAll(query: any) {
    const params = ['name','email','password','role'];
    const data = await this.selectQuery(query, params);

    const findAllPaceEmployeeData = await this.PaceEmployeeModel
      .find(data.findParams, data.projectParams, data.queryOptions)
      .lean()
      .skip(parseInt(query.skip, 10) || 0)
      .limit(parseInt(query.limit, 10) || 0);
    if (!findAllPaceEmployeeData) {
      throw new HttpException('PaceEmployee data not found.', HttpStatus.NOT_FOUND);
    }
    return findAllPaceEmployeeData;
  }

  async findOne(id: string) {
    const findOnePaceEmployee = await this.PaceEmployeeModel
      .findOne({
        _id: new mongoose.Types.ObjectId(id),
        isDeleted: false,
      })
      .lean();
    if (!findOnePaceEmployee) {
      throw new HttpException('PaceEmployee data not found.', HttpStatus.NOT_FOUND);
    }
    return findOnePaceEmployee;
  }

  async update(id: string, updatePaceEmployeeDto: UpdatePaceEmployeeDto) {
    const findData = await this.findOne(id);
    if (!findData) {
      throw new HttpException('PaceEmployee data not found.', HttpStatus.NOT_FOUND);
    } else {
      updatePaceEmployeeDto.password = await bcrypt.hash(updatePaceEmployeeDto.password, this.saltRounds);
      updatePaceEmployeeDto.updatedAt = moment().toISOString();

      const updatedPaceEmployee = await this.PaceEmployeeModel.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        updatePaceEmployeeDto
      );
      if (!updatedPaceEmployee) {
        throw new HttpException(
          'PaceEmployee data update failed.',
          HttpStatus.BAD_REQUEST
        );
      } else {
        console.log(updatedPaceEmployee)
        return 'PaceEmployee data updated successfully.';
      }
    }
  }

  async remove(id: string) {
    const removePaceEmployee = await this.PaceEmployeeModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { isDeleted: true }
    );
    if (!removePaceEmployee) {
      throw new HttpException(
        'PaceEmployee data deletion failed.',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return 'PaceEmployee data deleted successfully.';
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
