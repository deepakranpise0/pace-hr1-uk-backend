import moment from 'moment';
import mongoose, { Model } from 'mongoose';

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import {
  CreateUserDto,
  GetUserDto,
  UpdateUserDto,
} from '../_dtos/Dtos';
import { UserInterface } from '../_types/Types';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<UserInterface>
  ) { }
  
  async createUserData(createUserDto: CreateUserDto): Promise<GetUserDto> {
    const createUserData = await this.userModel.create(createUserDto);
    if (!createUserData) {
      throw new HttpException(
        'Error creating User data.',
        HttpStatus.BAD_REQUEST
      );
    }
    return createUserData;
  }
  
  async findAll(query: any) {
    const params = ['name','email'];
    const data = await this.selectQuery(query, params);

    const findAllUserData = await this.userModel
      .find(data.findParams, data.projectParams, data.queryOptions)
      .lean()
      .skip(parseInt(query.skip, 10) || 0)
      .limit(parseInt(query.limit, 10) || 0);
    if (!findAllUserData) {
      throw new HttpException('User data not found.', HttpStatus.NOT_FOUND);
    }
    return findAllUserData;
  }

  async findOne(id: string) {
    const findOneDeviceType = await this.userModel
      .findOne({
        _id: new mongoose.Types.ObjectId(id),
        isDeleted: false,
      })
      .lean();
    if (!findOneDeviceType) {
      throw new HttpException('User data not found.', HttpStatus.NOT_FOUND);
    }
    return findOneDeviceType;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findData = await this.findOne(id);
    if (!findData) {
      throw new HttpException('User data not found.', HttpStatus.NOT_FOUND);
    } else {
      let { name,email, isActive, updatedAt } = updateUserDto;
      name = name ? name : findData.name;
      email = email ? email : findData.email;
      isActive = isActive ? isActive : findData.isActive;
      updatedAt = moment().toISOString();

      const updatedDeviceType = await this.userModel.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        updateUserDto
      );
      if (!updatedDeviceType) {
        throw new HttpException(
          'User data update failed.',
          HttpStatus.BAD_REQUEST
        );
      } else {
        return 'User data updated successfully.';
      }
    }
  }

  async remove(id: string) {
    const removeDeviceType = await this.userModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { isDeleted: true }
    );
    if (!removeDeviceType) {
      throw new HttpException(
        'User data deletion failed.',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return 'User data deleted successfully.';
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
