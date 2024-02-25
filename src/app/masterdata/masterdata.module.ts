import { Mongoose } from 'mongoose';

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { MasterDataSchema } from './entities/masterdata.entity';
import { MasterController } from './masterdata.controller';
import { MasterService } from './masterdata.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MasterController],
  providers: [MasterService,
      {
        provide: 'MASTER_DATA_MODEL',
        useFactory: (mongoose: Mongoose) =>
          mongoose.model('masterdatas', MasterDataSchema),
        inject: ['DATABASE_CONNECTION'],
      },
    ]
})
export class MasterModule {}
