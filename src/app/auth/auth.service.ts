import * as bcrypt from 'bcrypt';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Injectable } from '@nestjs/common';
import {
  JwtService,
  JwtSignOptions,
} from '@nestjs/jwt';

import { PaceEmployeeService } from '../paceEmployee/paceEmployee.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private PaceEmployeeService:PaceEmployeeService) {}

  async validateUser(email: string, password: string): Promise<Boolean> {
    const query = { searchField: 'email', search: email };
    const userDetails = await this.PaceEmployeeService.findAll(query);
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
      const query = { searchField: 'email', search: email };
      const userDetails = await this.PaceEmployeeService.findAll(query);
      const jwtOptions: JwtSignOptions = {
        secret:environment.secretOrKey
      }
      console.log(userDetails)
      const access_token = this.jwtService.sign(payload, jwtOptions);
      return {access_token,role:userDetails[0].role}
    }catch(error){ 
      throwError("Login Failed",)
    }
  }
}
