import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DatabaseModule } from '../database/database.module';
import { PaceEmployeeModule } from '../paceEmployee/paceEmployee.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtConfigModule } from './jwt.config';
import { JwtStrategy } from './jwtStrategy';
import { LocalStrategy } from './localStrategy';

@Module({
    imports: [DatabaseModule,PaceEmployeeModule,JwtConfigModule],
    controllers: [AuthController],
    providers: [AuthService,JwtService,JwtStrategy, LocalStrategy]
})
export class AuthModule {}
