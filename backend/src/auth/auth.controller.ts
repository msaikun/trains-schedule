import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninUserDto } from '../users/dto/signin-user.dto';
import { AuthService }   from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOperation({ summary: 'Sign in' })
	@Post('/signin')
	signin(@Body() userDto: SigninUserDto, @Res({ passthrough: true }) res: Response) {
		return this.authService.signin(userDto, res);
	};

	@ApiOperation({ summary: 'Sign up' })
	@Post('/signup')
	signup(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
		return this.authService.signup(userDto, res);
	};

	@ApiOperation({ summary: 'Sign out' })
	@Post('/signout')
	signout(@Res({ passthrough: true }) res: Response) {
		return this.authService.signout(res);
	}
}
