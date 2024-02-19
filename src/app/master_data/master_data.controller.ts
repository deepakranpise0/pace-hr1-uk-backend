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
  CreateMasterDto,
  GetMasterDto,
  UpdateMasterDto,
} from '../dtos/Dtos';
import { MasterService } from './master_data.service';

@Controller('master_data')
export class MasterController {
    constructor(private readonly _masterService: MasterService) {}

  @Post()
  async createMasterData(@Body() createMasterDto: CreateMasterDto): Promise<CreateMasterDto> {
    return this._masterService.createMasterData(createMasterDto);
  }

  @Get()
  findAll(@Query() query):Promise<GetMasterDto[]> {
    return this._masterService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<GetMasterDto> {
    return this._masterService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMasterDto: UpdateMasterDto
  ):Promise<String> {
    return this._masterService.update(id, updateMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<String> {
    return this._masterService.remove(id);
  }
}
