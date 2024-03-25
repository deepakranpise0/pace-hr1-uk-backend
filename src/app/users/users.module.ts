import { Mongoose } from 'mongoose';

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserSchema } from './entities/users.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [DatabaseModule],
  exports:[UserService],
  controllers: [UserController],
  providers: [UserService,
      {
        provide: 'USER_MODEL',
        useFactory: (mongoose: Mongoose) =>
          mongoose.model('users', UserSchema),
        inject: ['DATABASE_CONNECTION'],
      },
    ]
})
export class UserModule {}
