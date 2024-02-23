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
  CreatePaceEmployeeDto,
  GetPaceEmployeeDto,
  UpdatePaceEmployeeDto,
} from '../_dtos/Dtos';
import { PaceEmployeeService } from './paceEmployee.service';

// @UseGuards(JwtAuthGuard)
@Controller('paceemployees')
export class PaceEmployeeController {
  constructor(private readonly _PaceEmployeeService: PaceEmployeeService) { }

  @Post()
  async createPaceEmployeeData(@Body() createPaceEmployeeDto: CreatePaceEmployeeDto): Promise<CreatePaceEmployeeDto> {
    return this._PaceEmployeeService.createPaceEmployeeData(createPaceEmployeeDto);
  }

  @Get()
  findAll(@Query() query):Promise<GetPaceEmployeeDto[]> {
    return this._PaceEmployeeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<GetPaceEmployeeDto> {
    return this._PaceEmployeeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaceEmployeeDto: UpdatePaceEmployeeDto
  ):Promise<String> {
    return this._PaceEmployeeService.update(id, updatePaceEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<String> {
    return this._PaceEmployeeService.remove(id);
  }
}
