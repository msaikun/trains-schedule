import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags }     from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService }  from './users.service';
import { User }          from './users.model';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOperation({ summary: 'User creation' })
	@ApiResponse({ status: 200, type: User })
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto);
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	// @UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Get user by accessToken' })
	@ApiResponse({ status: 200, type: User })
	@Get('user')
	async getProfileByToken(token: string) {
		return this.usersService.getUserByToken(token);
	}
}
