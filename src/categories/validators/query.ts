import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Category } from 'src/entities/Category.entity';

@ValidatorConstraint({ name: 'customText', async: false })
export class QuerySortValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    if (!value) {
      return false;
    }
    if (value[0] === '-') {
      value = value.slice(1);
    }
    if (Object.getOwnPropertyNames(Category.prototype).includes(value)) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Property ($value) does not exist!';
  }
}
