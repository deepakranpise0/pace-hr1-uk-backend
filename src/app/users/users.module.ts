import { Mongoose } from 'mongoose';

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserSchema } from './entities/users.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService,
      {
        provide: 'USER_MODEL',
        useFactory: (mongoose: Mongoose) =>
          mongoose.model('Users', UserSchema),
        inject: ['DATABASE_CONNECTION'],
      },
    ]
})
export class UserModule {}