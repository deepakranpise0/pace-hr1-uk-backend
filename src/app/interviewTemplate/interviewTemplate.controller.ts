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
  CreateInterviewTemplateDto,
  GetInterviewTemplateDto,
  UpdateInterviewTemplateDto,
} from '../_dtos/Dtos';
import { FirebaseAuthGuard } from '../auth/firebase.guard';
import { InterviewTemplateService } from './interviewTemplate.service';

@UseGuards(FirebaseAuthGuard)
@Controller('interviewTemplates')
export class InterviewTemplateController {
  constructor(private readonly _interviewTemplateService: InterviewTemplateService) { }

  @Post()
  async create(@Body() CreateInterviewTemplateDto: CreateInterviewTemplateDto): Promise<CreateInterviewTemplateDto> {
    return this._interviewTemplateService.create(CreateInterviewTemplateDto);
  }

  @Get()
  findAll(@Query() query):Promise<GetInterviewTemplateDto[]> {
    return this._interviewTemplateService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<GetInterviewTemplateDto> {
    return this._interviewTemplateService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateInterviewTemplateDto: UpdateInterviewTemplateDto
  ):Promise<String> {
    return this._interviewTemplateService.update(id, UpdateInterviewTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<String> {
    return this._interviewTemplateService.remove(id);
  }
}
