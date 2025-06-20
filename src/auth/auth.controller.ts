import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt.guard';
import { User } from './user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Connexion client' })
  @ApiResponse({ status: 200, description: 'Connexion réussie' })
  @ApiResponse({ status: 401, description: 'Identifiants incorrects' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Déconnexion client' })
  @ApiHeader({ name: 'authorization', description: 'Bearer token' })
  @ApiResponse({ status: 200, description: 'Déconnexion réussie' })
  logout(@Headers('authorization') authorization: string) {
    const token = authorization?.replace('Bearer ', '');
    return this.authService.logout(token);
  }

  @Get('sessions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer les sessions actives du client' })
  @ApiResponse({ status: 200, description: 'Liste des sessions actives' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  getActiveSessions(@User() user: any) {
    return this.authService.getActiveSessions(user.id);
  }

  @Post('logout-all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Déconnecter toutes les sessions du client' })
  @ApiResponse({ status: 200, description: 'Toutes les sessions fermées' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  logoutAll(@User() user: any) {
    return this.authService.logoutAll(user.id);
  }
}
