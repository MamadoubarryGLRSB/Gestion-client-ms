import { ApiProperty } from '@nestjs/swagger';

export class ClientDataDto {
  @ApiProperty({ description: 'ID du client' })
  id: string;

  @ApiProperty({ description: 'Email du client' })
  email: string;

  @ApiProperty({ description: 'Prénom du client' })
  firstName: string;

  @ApiProperty({ description: 'Nom du client' })
  lastName: string;

  @ApiProperty({ description: 'Rôle du client', enum: ['CLIENT', 'CHEF', 'LIVREUR', 'ADMIN'] })
  role: string;

  @ApiProperty({ description: 'Statut actif' })
  isActive: boolean;

  @ApiProperty({ description: 'Date de création' })
  createdAt: Date;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'Token JWT' })
  access_token: string;

  @ApiProperty({ description: 'Données du client connecté', type: ClientDataDto })
  client: ClientDataDto;
} 