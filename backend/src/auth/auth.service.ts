import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
}                     from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt    from 'bcryptjs'

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService }  from '../users/users.service';
import { User }          from '../users/users.model';
import { SigninUserDto } from '../users/dto/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async signin(userDto: SigninUserDto) {
    const user = await this.validateUser(userDto);

    console.log('signin token', this.generateToken(user));

    return this.generateToken(user);
  }

  async signup(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('User with such email does not exist', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user         = await this.userService.createUser({ ...userDto, password: hashPassword });

    console.log('signup token', this.generateToken(user));
    return this.generateToken(user);
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
