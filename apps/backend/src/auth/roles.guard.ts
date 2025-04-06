import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles required
    }

    const request = context.switchToHttp().getRequest();
    let token: string | undefined;

    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.replace('Bearer ', '');
    } else if (request.cookies?.jwt) {
      token = request.cookies.jwt;
    }

    if (!token) throw new ForbiddenException('No token found');

    try {
      const payload = await this.jwtService.verifyAsync(token);
      const userRole = payload.role;
      if (!requiredRoles.includes(userRole)) {
        throw new ForbiddenException('Insufficient role');
      }
      request.user = payload; // Attach user info to request
      return true;
    } catch {
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}
