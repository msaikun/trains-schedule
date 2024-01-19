import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
}                     from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt    from 'bcryptjs'
import { CookieOptions, Response } from 'express';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService }  from '../users/users.service';
import { User }          from '../users/users.model';
import { SigninUserDto } from '../users/dto/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}
  async signin(userDto: SigninUserDto, res: Response) {
    const user  = await this.validateUser(userDto);
    const token = this.generateToken(user);

    res.cookie('accessToken', token, { httpOnly: true });

    return token;
  }

  async signup(userDto: CreateUserDto, res: Response) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('User with such email already exist', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user         = await this.userService.createUser({ ...userDto, password: hashPassword });
    const token        = this.generateToken(user);

    res.cookie('accessToken', token, { httpOnly: true });

    console.log('signup token', token);
    return token;
  };

  async signout(res: Response) {
    const cookieOptions: CookieOptions = {
      httpOnly : true,
      expires  : new Date(0),
    };

    res.cookie('authToken', '', cookieOptions);

    return { message: 'Signout successful' };
  };

  private async generateToken({ email, id, userName, isAdmin }: User) {
    const payload = { email, id, userName, isAdmin };

    return { token: this.jwtService.sign(payload) };
  };

  private async validateUser(userDto: SigninUserDto) {
    const user           = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Wrong password or email' });
  }
}

