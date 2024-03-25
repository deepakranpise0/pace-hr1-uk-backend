import { Response } from 'express';
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
  Res,
  UseGuards,
} from '@nestjs/common';

import {
  CreateInterviewResponseDto,
  GetInterviewResponseDto,
  UpdateInterviewResponseDto,
} from '../_dtos/Dtos';
import { FirebaseAuthGuard } from '../auth/firebase.guard';
import { InterviewResponseService } from './interviewResponse.service';

@UseGuards(FirebaseAuthGuard)
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
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId):Promise<GetInterviewResponseDto> {
    return this._interviewResponseService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() UpdateInterviewResponseDto: UpdateInterviewResponseDto
  ):Promise<String> {
    return this._interviewResponseService.update(id, UpdateInterviewResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.Schema.Types.ObjectId):Promise<String> {
    return this._interviewResponseService.remove(id);
  }

  @Get('download/:id')
  async downloadPdf(@Param('id') id: mongoose.Schema.Types.ObjectId,@Res() res: Response) {
    try {      
      // Set response headers
      res.setHeader('Content-Disposition', 'attachment; filename=file.pdf');
      res.setHeader('Content-Type', 'application/pdf');

      return this._interviewResponseService.generatePdf(id,res)
    
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}
