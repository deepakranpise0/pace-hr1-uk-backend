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
  CreateInterviewResponseDto,
  GetInterviewResponseDto,
  UpdateInterviewResponseDto,
} from '../_dtos/Dtos';
import { JwtAuthGuard } from '../auth/auth.guard';
import { InterviewResponseService } from './interviewResponse.service';

@UseGuards(JwtAuthGuard)
@Controller('interviewResponses')
export class InterviewResponseController {
  constructor(private readonly _interviewResponseService: InterviewResponseService) { }

  @Post()
  async create(@Body() CreateInterviewResponseDto: CreateInterviewResponseDto): Promise<CreateInterviewResponseDto> {
    return this._interviewResponseService.create(CreateInterviewResponseDto);
  }

  @Get()
  findAll(@Query() query):Promise<GetInterviewResponseDto[]> {
    return this._interviewResponseService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<GetInterviewResponseDto> {
    return this._interviewResponseService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateInterviewResponseDto: UpdateInterviewResponseDto
  ):Promise<String> {
    return this._interviewResponseService.update(id, UpdateInterviewResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<String> {
    return this._interviewResponseService.remove(id);
  }
}
