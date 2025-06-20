import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

interface RequestWithUser {
  user?: any;
  headers: {
    authorization?: string;
  };
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token manquant');
    }

    try {
      this.jwtService.verify(token);
      const client = await this.authService.validateSession(token);

      if (!client) {
        throw new UnauthorizedException('Session invalide ou expirée');
      }

      request.user = client;
      return true;
    } catch {
      throw new UnauthorizedException('Token invalide');
    }
  }

  private extractTokenFromHeader(request: RequestWithUser): string | undefined {
    const authorization = request.headers.authorization;
    if (!authorization) return undefined;

    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
