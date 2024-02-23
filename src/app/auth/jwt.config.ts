import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../../environments/environment';

@Module({
  imports: [
    JwtModule.register({
        secret: environment.secretOrKey,   
        signOptions: { expiresIn: '15m' },
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {
}
