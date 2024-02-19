import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MasterModule } from './master_data/master_data.module';

@Module({
  imports: [DatabaseModule,MasterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
