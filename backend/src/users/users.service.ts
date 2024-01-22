import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel }   from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private jwtService: JwtService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    return user;
  };

  async getAllUsers() {
    const users = await this.userRepository.findAll();

    return users;
  };

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });

    return user;
  };

  async getUserByToken(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);

      const { email } = decodedToken;

      const user = await this.getUserByEmail(email);

      if (!user) {
        throw new UnauthorizedException({ message: 'User not found' });
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException({ message: 'Invalid token' });
    }
  };
}
