import { ApiProperty }   from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SigninUserDto } from './signin-user.dto';

export class CreateUserDto extends SigninUserDto {
	@ApiProperty({ example: 'Maryna Saikun', description: 'UserName' })
	@IsString({ message: 'Should be a string' })
	@IsNotEmpty()
	readonly userName: string;

	@ApiProperty({ example: true, description: 'Is Admin' })
	readonly isAdmin: boolean;
}
