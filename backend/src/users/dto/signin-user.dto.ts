import { ApiProperty }                        from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class SigninUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Wrong email' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @IsString({ message: 'Should be a string' })
  @Length(8, 32, { message: 'Should be min 8 and max 32 symbols' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'Should contain at least one letter and one number' })
  readonly password: string;
}
