import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule }    from '@nestjs/sequelize';

import { UsersController } from './users.controller';
import { UsersService }    from './users.service';
import { User }            from './users.model';
import { AuthModule }      from '../auth/auth.module';

@Module({
  controllers : [UsersController],
  providers   : [UsersService],
  exports     : [UsersService],
  imports     : [
    SequelizeModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
})

export class UsersModule {}
