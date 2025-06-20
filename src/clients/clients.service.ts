import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const existingClient = await this.prisma.client.findUnique({
      where: { email: createClientDto.email },
    });

    if (existingClient) {
      throw new ConflictException('Un client avec cet email existe déjà');
    }

    const hashedPassword = await bcrypt.hash(createClientDto.password, 10);

    const client = await this.prisma.client.create({
      data: {
        ...createClientDto,
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = client;
    return result;
  }

  async findAll() {
    const clients = await this.prisma.client.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        address: true,
        city: true,
        postalCode: true,
        country: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return clients;
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        address: true,
        city: true,
        postalCode: true,
        country: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!client) {
      throw new NotFoundException('Client non trouvé');
    }

    return client;
  }

  async findByEmail(email: string) {
    return this.prisma.client.findUnique({
      where: { email },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.client.delete({
      where: { id },
    });

    return { message: 'Client supprimé avec succès' };
  }
}
