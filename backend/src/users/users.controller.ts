import { Controller, Get, HttpException, HttpStatus, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags }              from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Get user by accessToken' })
	@ApiResponse({ status: 200, type: User })
	@Get('info')
	async getProfileByToken(@Req() req: any) {
		const accessToken = req.cookies.accessToken;

		console.log('reeeeeeeeed', req);

		if (!accessToken) {
			throw new HttpException('Access token not found in the cookie', HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return this.usersService.getUserByToken(accessToken);
	}
}
