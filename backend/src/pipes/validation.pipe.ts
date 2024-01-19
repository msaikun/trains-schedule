import { registerDecorator, ValidationOptions, validate } from 'class-validator';
import { plainToClass } from "class-transformer";
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { ValidationException } from "../exceptions/validation.exception";


const passCharacterRegEx = /[a-zA-Z]/;
const passNumericRegEx = /\d/;

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name         : 'isStrongPassword',
      target       : object.constructor,
      propertyName : propertyName,
      constraints  : [],
      options      : validationOptions,
      validator    : {
        validate(value: string) {
          if (!passCharacterRegEx.test(value) || !passNumericRegEx.test(value)) {
            return false;
          }

          return true;
        },
      },
    });
  };
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj    = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      let messages = errors.map((err) => `${err.property} - ${Object.values(err.constraints).join(', ')}`);

      throw new ValidationException(messages);
    }

    return value;
  }
}
