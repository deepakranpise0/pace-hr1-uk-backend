import moment from 'moment';
import mongoose, { Model } from 'mongoose';

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import {
  CreateMasterDto,
  GetMasterDto,
  UpdateMasterDto,
} from '../_dtos/Dtos';
import { masterDataInterface } from '../_types/Types';

@Injectable()
export class MasterService {
  constructor(
    @Inject('MASTER_DATA_MODEL')
    private readonly masterDataModel: Model<masterDataInterface>
  ) { }
  
  async createMasterData(createMasterDto: CreateMasterDto): Promise<GetMasterDto> {
    const createMasterData = await this.masterDataModel.create(createMasterDto);
    if (!createMasterData) {
      throw new HttpException(
        'Error creating Master data.',
        HttpStatus.BAD_REQUEST
      );
    }
    return createMasterData;
  }
  
  async findAll(query: any) {
    const params = ['masterDataType','name','description','isActive'];
    const data = await this.selectQuery(query, params);

    const findAllMasterData = await this.masterDataModel
      .find(data.findParams, data.projectParams, data.queryOptions)
      .lean()
      .skip(parseInt(query.skip, 10) || 0)
      .limit(parseInt(query.limit, 10) || 0);
    if (!findAllMasterData) {
      throw new HttpException('Master data not found.', HttpStatus.NOT_FOUND);
    }
    return findAllMasterData;
  }

  async findOne(id: string) {
    const findOneDeviceType = await this.masterDataModel
      .findOne({
        _id: new mongoose.Types.ObjectId(id),
        isDeleted: false,
      })
      .lean();
    if (!findOneDeviceType) {
      throw new HttpException('Master data not found.', HttpStatus.NOT_FOUND);
    }
    return findOneDeviceType;
  }

  async update(id: string, updateMasterDto: UpdateMasterDto) {
    const findData = await this.findOne(id);
    if (!findData) {
      throw new HttpException('Master data not found.', HttpStatus.NOT_FOUND);
    } else {
      let { description, name, isActive, updatedAt } = updateMasterDto;
      description = description ? description : findData.description;
      name = name ? name : findData.name;
      isActive = isActive? isActive: findData.isActive;
      updatedAt = moment().toISOString();

      const updatedDeviceType = await this.masterDataModel.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        updateMasterDto
      );
      if (!updatedDeviceType) {
        throw new HttpException(
          'Master data update failed.',
          HttpStatus.BAD_REQUEST
        );
      } else {
        return 'Master data updated successfully.';
      }
    }
  }

  async remove(id: string) {
    const removeDeviceType = await this.masterDataModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { isDeleted: true }
    );
    if (!removeDeviceType) {
      throw new HttpException(
        'Master data deletion failed.',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return 'Master data deleted successfully.';
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
        const mainQuery=[]
        params.forEach((param) => {
          let searchQuery={}
          if (param !== 'isActive') {
            searchQuery[param] = { $regex: data.search, $options: 'i' };
            mainQuery.push(searchQuery);
          }
        });
        query.findParams = {
          $or: mainQuery,
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
