import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { environment } from '../../environments/environment';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.secretOrKey, // Replace with your actual secret key
    });
  }

  async validate(payload: any) {
    return { username: payload.email };
  }
}
