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
  CreateUserInterviewTemplateDto,
  GetUserInterviewTemplateDto,
  UpdateUserInterviewTemplateDto,
} from '../_dtos/Dtos';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserInterviewTemplateService } from './userInterviewTemplate.service';

@UseGuards(JwtAuthGuard)
@Controller('userInterviewTemplates')
export class UserInterviewTemplateController {
  constructor(private readonly _UserInterviewTemplateService: UserInterviewTemplateService) { }

  @Post()
  async create(@Body() CreateUserInterviewTemplateDto: CreateUserInterviewTemplateDto): Promise<CreateUserInterviewTemplateDto> {
    return this._UserInterviewTemplateService.create(CreateUserInterviewTemplateDto);
  }

  @Get()
  findAll(@Query() query):Promise<GetUserInterviewTemplateDto[]> {
    return this._UserInterviewTemplateService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<GetUserInterviewTemplateDto> {
    return this._UserInterviewTemplateService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateUserInterviewTemplateDto: UpdateUserInterviewTemplateDto
  ):Promise<String> {
    return this._UserInterviewTemplateService.update(id, UpdateUserInterviewTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<String> {
    return this._UserInterviewTemplateService.remove(id);
  }
}
