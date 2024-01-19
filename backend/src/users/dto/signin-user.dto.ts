import { ApiProperty }               from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { IsStrongPassword }          from '../../pipes/validation.pipe';

export class SigninUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Wrong email' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @IsString({ message: 'Should be a string' })
  @Length(8, 32, { message: 'Should be min 8 and max 32 symbols' })
  @IsStrongPassword({ message: 'Alphabetic and numeric symbols are required' })
  readonly password: string;
}
