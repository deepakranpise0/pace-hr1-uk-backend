import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types } from 'mongoose';

import { Injectable } from '@nestjs/common';

import { PaceEmployeeService } from '../paceEmployee/paceEmployee.service';

@ValidatorConstraint({ name: 'isMongoId', async: false })
export class IsMongoIdConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return Types.ObjectId.isValid(value);
  }

  defaultMessage(): string {
    return '$property must be a valid MongoDB ObjectId';
  }
}

export function IsMongoId(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMongoIdConstraint,
    });
  };
}

@Injectable()
@ValidatorConstraint({async: true })
export class IsUniqueEmail implements ValidatorConstraintInterface {
  constructor(private paceEmployeeService: PaceEmployeeService) {}

  async validate(email: string): Promise<boolean> {
    const query = { searchField: 'email', search: email };
    console.log(query);
    const user = await this.paceEmployeeService.findAll(query);
    return !user;
  }

  defaultMessage(): string {
    return 'Email already exists';
  }
}

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueEmail,
    });
  };
}
