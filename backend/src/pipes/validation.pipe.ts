import { registerDecorator, ValidationOptions } from 'class-validator';
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
