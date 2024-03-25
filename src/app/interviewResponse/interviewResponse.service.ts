import moment from 'moment';
import mongoose, { Model } from 'mongoose';
import PDFDocument from 'pdfkit';

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import {
  CreateInterviewResponseDto,
  GetInterviewResponseDto,
  UpdateInterviewResponseDto,
} from '../_dtos/Dtos';
import {
  InterviewResponseInterface,
  UserInterface,
} from '../_types/Types';
import { UserService } from '../users/users.service';

@Injectable()
export class InterviewResponseService {
  populateArray = [
    { path: 'userId', select: 'name' },
    { path: 'templateId', select: 'templateName' },
    { path: 'questionsPerSection.sectionId', select: 'name' },
    {
      path: 'questionsPerSection.questionId.high',
      select: 'name description',
    },
    {
      path: 'questionsPerSection.questionId.indicator',
      select: 'indicatorValue name',
    },
  ];

  constructor(
    @Inject('INTERVIEW_RESPONSE_MODEL')
    private readonly _InterviewResponseModel: Model<InterviewResponseInterface>,
    private readonly _userService: UserService
  ) {}

  async create(
    CreateInterviewResponseDto: CreateInterviewResponseDto
  ): Promise<GetInterviewResponseDto> {
    const userName = await this._userService.findOne(
      CreateInterviewResponseDto.userId
    );
    const createInterviewResponse = await this._InterviewResponseModel.create(
      CreateInterviewResponseDto
    );

    if (!createInterviewResponse) {
      throw new HttpException(
        'Error creating user interview response data.',
        HttpStatus.BAD_REQUEST
      );
    }
    return createInterviewResponse;
  }

  async findAll(query: any) {
    const params = [];
    const data = await this.selectQuery(query, params);

    const findAllInterviewResponse = await this._InterviewResponseModel
      .find(data.findParams, data.projectParams, data.queryOptions)
      .populate(this.populateArray)
      .lean()
      .skip(parseInt(query.skip, 10) || 0)
      .limit(parseInt(query.limit, 10) || 0);
    if (!findAllInterviewResponse) {
      throw new HttpException(
        'User interview response data not found.',
        HttpStatus.NOT_FOUND
      );
    }
    return findAllInterviewResponse;
  }

  async findOne(id: mongoose.Schema.Types.ObjectId){
    const findOneInterviewResponse = await this._InterviewResponseModel
      .findOne({
        _id: id,
        isDeleted: false,
      })
      .populate<UserInterface>(this.populateArray)
      .lean();
    if (!findOneInterviewResponse) {
      throw new HttpException(
        'User interview response data not found.',
        HttpStatus.NOT_FOUND
      );
    }
    return findOneInterviewResponse;
  }

  async update(
    id: mongoose.Schema.Types.ObjectId,
    UpdateInterviewResponseDto: UpdateInterviewResponseDto
  ) {
    const findData = await this.findOne(id);
    if (!findData) {
      throw new HttpException(
        'User interview response data not found.',
        HttpStatus.NOT_FOUND
      );
    } else {
      let { isActive, templateId, updatedAt, userId, questionsPerSection } =
        UpdateInterviewResponseDto;
      templateId = templateId ? templateId : findData.templateId;
      userId = userId ? userId : findData.userId;
      questionsPerSection = questionsPerSection
        ? questionsPerSection
        : findData.questionsPerSection;
      isActive = isActive ? isActive : findData.isActive;
      updatedAt = moment().toISOString();
      const updatedInterviewResponse =
        await this._InterviewResponseModel.updateOne(
          { _id: id },
          UpdateInterviewResponseDto
        );

      if (!updatedInterviewResponse) {
        throw new HttpException(
          'User interview response data update failed.',
          HttpStatus.BAD_REQUEST
        );
      } else {
        return 'User interview response data updated successfully.';
      }
    }
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    const removeInterviewResponse =
      await this._InterviewResponseModel.updateOne(
        { _id: id },
        { isDeleted: true }
      );
    if (!removeInterviewResponse) {
      throw new HttpException(
        'User interview response data deletion failed.',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return 'User interview response data deleted successfully.';
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
        const searchQuery = {};
        params.forEach((param) => {
          if (param !== 'isActive')
            searchQuery[param] = { $regex: data.search, $options: 'i' };
        });
        query.findParams = {
          $or: [searchQuery],
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



async generatePdf(id:mongoose.Schema.Types.ObjectId,res) {
    try {
      const data= (await this.findOne(id)).userId as unknown as UserInterface;
      const name   = data.name ;
      var doc:PDFDocument = new PDFDocument({ size: 'A4',  bufferPages: true  });
      doc.pipe(res);
      const addHeader = () => {
        const imagePath = './src/assets/images/pace.jpg'; // Replace with the path to your image
        doc.image(imagePath, 75, 25, { width: 125 }).moveDown(1);
      };
      addHeader();
      doc.on('pageAdded', () => {
        addHeader();
      });
      doc
        .fillColor('black')
        .font('Courier-Bold')
        .text(`Name: ${name}`, { align: 'left', continued: true });
      const dateText = `Date: ${moment().format('Do MMMM YYYY')}`;
      const dateWidth = doc.widthOfString(dateText);
      doc
        .fillColor('black')
        .font('Courier-Bold')
        .text(dateText, { align: 'right', width: dateWidth });

      doc.moveDown(0.5);
      doc
        .fontSize(12)
        .fillColor('black')
        .font('Courier-Bold')
        .text('Introduction')
        .moveDown(0.5)
        .font('Courier')
        .fillColor('black')
        .text(
          'This PACE report is intended to provide you with an overview of your performance at the Development Centre against each of the practical assessment centre exercises. It is important to pay particular attention to those areas where you have demonstrated your strengths as well as considering areas for development. Performing well in Assessment Centres is as much about playing to our strengths as it is in developing our weaker areas.'
        )
        .moveDown(0.5)
        .font('Courier-Bold')
        .text('Overview of Development Centre Exercises')
        .moveDown(1)
        .font('Courier-Bold')
        .text('Interview Exercise')
        .moveDown(0.5)
        .font('Courier')
        .text(
          'In this exercise we will look at a number of Motivational fit questions, followed by a competency-based question, and finally a strength-based interview question.'
        )
        .moveDown(0.5)
        .text(
          'Strength Based questions look at a combination of what people are good at and what they enjoy doing. It focuses on specific areas which motivate, naturally enthuse and excite candidates.'
        )
        .moveDown(0.5)
        .text(
          'Questions have been designed in relation to some of the strengths which are most heavily linked to success in the role you are applying for. We will look at your reasons and motivation for your application. As well as your ability to make informed decisions based on analysis and problem solving, including how you adapt to changing circumstances. Throughout the exercise you will be assessed by your Peers.'
        )
        .moveDown(0.5)
        .font('Courier-Bold')
        .text('Group Exercise')
        .moveDown(0.5)
        .font('Courier')
        .text(
          'The group exercise looks at an inter-team discussion based on a hypothetical setting. You have recently joined a graduate scheme at Bentleys, a large retail organisation and have been asked to meet with a group of your colleagues to consider a number of issues and identify ways which will ultimately improve customer service.'
        )
        .moveDown(0.5)
        .font('Courier-Bold')
        .text('Presentation Exercise')
        .moveDown(0.5)
        .font('Courier')
        .text(
          'In this exercise, you were given 30 minutes preparation time in order to present your findings to the interview panel addressing their questions, around the challenges of COVID-19 after post lockdown and how the Government should respond to these challenges.'
        )
        .moveDown(0.5)
        .fillColor('red')
        .font('Courier-Bold')
        .text('Interview Exercise Feedback')
        .moveDown(0.5)
        .font('Courier')
        .fillColor('black')
        .text(
          'You were polite and professional throughout the discussion, took ownership from the start, able to lead the group by ensuring they were focused on the overall objective, in order to complete the task within the allocated time.'
        )
        .moveDown(0.5)
        .text(
          'Whilst you demonstrated motivation around working in the public sector e.g. wanting to work with different departments on a variety projects, making use of project management skills and looking to further develop yourself by completing the APM exam, you would have benefited from elaborating further around how your qualities would make you a success in the role.'
        )
        .moveDown(0.5)
        .text(
          'When sharing your competency based example about a time where you used your analytical skills in order to solve a problem and make a decision, you would have benefited from explaining what the specific problem was and how you were able to make effective decisions based on your analysis/research. In future consider providing the relevant detail in your responses around your thought process when making informed decisions.'
        )
        .moveDown(0.5)
        .text(
          'You demonstrated good engagement and capability in your strength-based interview responses when explaining how you adapted to change in the workplace, due to COVID-19 i.e. enjoying the challenging, putting in the necessary measures to ensure a restaurant business survived. There was further scope for you to elaborate how you involved the business owners and how they bought into your ideas.'
        )
        .moveDown(0.5)
        .fillColor('red')
        .font('Courier-Bold')
        .text('Group Exercise Feedback')
        .moveDown(0.5)
        .fillColor('black')
        .font('Courier')
        .text(
          'You were polite and professional throughout the discussion, took ownership from the start, able to lead the group by ensuring they were focused on the overall objective, in order to complete the task within the allocated time.'
        )
        .text(
          'You allowed others to put forward their ideas by actively listening and agreeing with their suggestions, however there was scope for you to encourage the quieter members for their input.'
        )
        .moveDown(0.5)
        .fillColor('red')
        .font('Courier-Bold')
        .text('Presentation Exercise')
        .moveDown(0.5)
        .font('Courier')
        .fillColor('black')
        .text(
          'You presented your findings in a polite and professional manner, addressing the main issues by providing the relevant detail in your responses i.e. main issues around Post Covid-19. You maintained eye contact and you were clear, concise and confident in terms of your delivery, demonstrating a good understanding. Although at times there was some scope for you to elaborate further when answering the panel members questions and not providing generic responses.'
        )
        .moveDown(0.5);
      
      let pages = doc.bufferedPageRange();
        for (let i = 0; i < pages.count; i++) {
          doc.switchToPage(i);
          let oldBottomMargin = doc.page.margins.bottom;
          doc.page.margins.bottom = 0 //Dumb: Have to remove bottom margin in order to write into it
          doc
            .fillColor("blue")
            .fontSize(8)
            .text(
              `University | PACE MATERIALS | HR in One 2020 © : ${i + 1} of ${pages.count}`,
              75,
              doc.page.height - (oldBottomMargin/2), // Centered vertically in bottom margin
              { align: 'left' }
            );
          doc.page.margins.bottom = oldBottomMargin; // ReProtect bottom margin
        }
      
      doc.end();
      console.log("PDF")
      return doc;
    } catch (error) {
      console.log(error);
    }
  }
}
