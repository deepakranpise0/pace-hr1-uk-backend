import * as admin from 'firebase-admin';
import {
  ExtractJwt,
  Strategy,
} from 'passport-firebase-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

const serviceAccount = require('../../../firebase.json');

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket:'gs://pace-43470.appspot.com'
    });
  }

  async validate(token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw error; // Handle error appropriately
    }
  }
}
