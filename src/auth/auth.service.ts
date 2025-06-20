import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../config/prisma.service';
import { ClientsService } from '../clients/clients.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const client = await this.clientsService.findByEmail(loginDto.email);

    if (
      !client ||
      !(await bcrypt.compare(loginDto.password, client.password))
    ) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    if (!client.isActive) {
      throw new UnauthorizedException('Compte désactivé');
    }

    const payload = { sub: client.id, email: client.email, role: client.role };
    const token = this.jwtService.sign(payload);

    await this.createSession(client.id, token);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...clientData } = client;
    return {
      access_token: token,
      client: clientData,
    };
  }

  async createSession(clientId: string, token: string) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    return this.prisma.session.create({
      data: {
        clientId,
        token,
        expiresAt,
      },
    });
  }

  async logout(token: string) {
    await this.prisma.session.updateMany({
      where: { token, isActive: true },
      data: { isActive: false },
    });

    return { message: 'Déconnexion réussie' };
  }

  async getActiveSessions(clientId: string) {
    const sessions = await this.prisma.session.findMany({
      where: {
        clientId,
        isActive: true,
        expiresAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        token: true,
        createdAt: true,
        expiresAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      activeSessions: sessions.length,
      sessions: sessions.map((session) => ({
        id: session.id,
        token: session.token.substring(0, 20) + '...', // Masquer le token complet
        createdAt: session.createdAt,
        expiresAt: session.expiresAt,
      })),
    };
  }

  async logoutAll(clientId: string) {
    const result = await this.prisma.session.updateMany({
      where: {
        clientId,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });

    return {
      message: 'Toutes les sessions ont été fermées',
      sessionsTerminated: result.count,
    };
  }

  async validateSession(token: string) {
    const session = await this.prisma.session.findUnique({
      where: { token },
      include: { client: true },
    });

    if (!session || !session.isActive || session.expiresAt < new Date()) {
      return null;
    }

    return session.client;
  }
}
