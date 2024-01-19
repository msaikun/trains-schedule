import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
}                     from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector }  from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      // const requiredRoles = this.reflector.getAllAndOverride<string[]>('isAdmin', [
      //   context.getHandler(),
      //   context.getClass(),
      // ]);
  
      // if (!requiredRoles) return true;
  
      const req        = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer     = authHeader.split(' ')[0]
      const token      = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User is not logged in' })
      }

      const user = this.jwtService.verify(token);
      req.user   = user;

      return true;
    } catch (e) {
      throw new HttpException('You do not have an access', HttpStatus.FORBIDDEN)
    }
  }

}
