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
  CreateQuestionsDto,
  GetQuestionsDto,
  UpdateQuestionsDto,
} from '../_dtos/Dtos';
import { JwtAuthGuard } from '../auth/auth.guard';
import { QuestionsService } from './questions.service';

@UseGuards(JwtAuthGuard)
@Controller('questions')
export class QuestionsController {
  constructor(private readonly _QuestionService: QuestionsService) { }

  @Post()
  async createQuestionData(@Body() CreateQuestionsDto: CreateQuestionsDto): Promise<CreateQuestionsDto> {
    return this._QuestionService.createQuestionData(CreateQuestionsDto);
  }

  @Get()
  findAll(@Query() query):Promise<GetQuestionsDto[]> {
    return this._QuestionService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<GetQuestionsDto> {
    return this._QuestionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateQuestionsDto: UpdateQuestionsDto
  ):Promise<String> {
    return this._QuestionService.update(id, UpdateQuestionsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<String> {
    return this._QuestionService.remove(id);
  }
}
