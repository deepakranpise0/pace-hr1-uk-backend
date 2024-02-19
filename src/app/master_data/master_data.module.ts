import { Mongoose } from 'mongoose';

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { MasterController } from './master_data.controller';
import { MasterService } from './master_data.service';
import { MasterDataSchema } from './modals/master_data.modal';

@Module({
  imports: [DatabaseModule],
  controllers: [MasterController],
  providers: [MasterService,
      {
        provide: 'MASTER_DATA_MODEL',
        useFactory: (mongoose: Mongoose) =>
          mongoose.model('MasterData', MasterDataSchema),
        inject: ['DATABASE_CONNECTION'],
      },
    ]
})
export class MasterModule {}
