import mongoose from 'mongoose';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  CreateUserDto,
  GetUserDto,
  UpdateUserDto,
} from '../_dtos/Dtos';
import { FirebaseAuthGuard } from '../auth/firebase.guard';
import { UserService } from './users.service';

@UseGuards(FirebaseAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly _UserService: UserService) { }

  @Post()
  async createUserData(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this._UserService.createUserData(createUserDto);
  }

  @Get()
  findAll(@Query() query):Promise<GetUserDto[]> {
    return this._UserService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId):Promise<GetUserDto> {
    return this._UserService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto
  ):Promise<String> {
    return this._UserService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.Schema.Types.ObjectId):Promise<String> {
    return this._UserService.remove(id);
  }
}
