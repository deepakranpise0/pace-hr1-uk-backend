import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { FirebaseAuthGuard } from './firebase.guard';
import { FirebaseStrategy } from './firebase.strategy';

@Module({
  imports: [PassportModule],
  providers: [FirebaseStrategy, FirebaseAuthGuard],
  exports: [FirebaseAuthGuard], // If you want to use the guard in other modules
})
export class FirebaseModule {}
