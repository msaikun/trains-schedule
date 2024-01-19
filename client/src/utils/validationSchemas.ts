import * as Yup from 'yup';
import { passCharacterRegEx, passNumericRegEx } from './regexpPaterns';

export const authValidationSchema = (emails: string[], isRegistered: boolean) => Yup.object().shape({
  userName : isRegistered ? Yup.string().nullable() : Yup.string().required(),
  email    : Yup.string().email().required().notOneOf(emails, 'This email already exists'),
  password : Yup.string().min(8).max(32)
    .matches(passCharacterRegEx, 'Alphabetic symbols are required')
    .matches(passNumericRegEx, 'Numeric symbols are required')
    .required(),
});
