import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { PaceEmployeeService } from '../paceEmployee/paceEmployee.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private PaceEmployeeService:PaceEmployeeService) {}

  async validateUser(email: string, password: string): Promise<Boolean> {
    const query = { searchField: 'email', search: email };
    const userDetails = await this.PaceEmployeeService.findAll(query);
    console.log(userDetails)
    if (userDetails.length > 0) {
      const isValidPassword = await bcrypt.compare(password, userDetails[0].password);
      return isValidPassword?isValidPassword:false;
    } else {
      return false;
    }
  }

  async login(user: any) {
    try {
      const { email } = user.body;
      const payload = { email };
      const jwtOptions: JwtSignOptions = {
        secret:environment.secretOrKey
      }
      console.log(payload);
      return {
        access_token: this.jwtService.sign(payload,jwtOptions)
      }
    }catch(error){ 
      console.log(error); 
      return {access_token:''}
    }
  }
}
