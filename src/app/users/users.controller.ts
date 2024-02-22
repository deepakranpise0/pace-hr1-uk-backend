import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import {
  CreateUserDto,
  GetUserDto,
  UpdateUserDto,
} from '../_dtos/Dtos';
import { UserService } from './users.service';

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
  findOne(@Param('id') id: string):Promise<GetUserDto> {
    return this._UserService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ):Promise<String> {
    return this._UserService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<String> {
    return this._UserService.remove(id);
  }
}
