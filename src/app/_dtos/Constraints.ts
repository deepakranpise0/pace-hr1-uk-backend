import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types } from 'mongoose';

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
