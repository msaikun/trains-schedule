import * as Yup from 'yup';
import { passCharacterRegEx, passNumericRegEx } from './regexpPaterns';

export const authValidationSchema = (emails: string[], isRegistered: boolean) => Yup.object().shape({
  userName : isRegistered ? Yup.string().nullable() : Yup.string().required('User Name is required'),
  email    : Yup.string().email().required().notOneOf(emails, 'This email already exists'),
  password : Yup.string().min(8).max(32)
    .matches(passCharacterRegEx, 'Alphabetic symbols are required')
    .matches(passNumericRegEx, 'Numeric symbols are required')
    .required('Password is required'),
});

export const trainScheduleValidationSchema = Yup.object().shape({
  from          : Yup.string().required(),
  to            : Yup.string().required(),
  status        : Yup.string().required(),
  carriageType  : Yup.string().required(),
  price         : Yup.number().required().min(0, 'Price must be equal to or greater than 0'),
  arrivalTime   : Yup.string().required(),
  departureTime : Yup.string().required()
    .test('is-departure-before-arrival', 'Departure time must be before arrival', function (value) {
      const arrivalTime = this.parent.arrivalTime;

      return !arrivalTime || value < arrivalTime;
    }),
});
