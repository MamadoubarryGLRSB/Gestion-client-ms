import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';

export enum UserRole {
  CLIENT = 'CLIENT',
  CHEF = 'CHEF',
  LIVREUR = 'LIVREUR',
  ADMIN = 'ADMIN',
}

export class CreateClientDto {
  @ApiProperty({
    description: 'Email du client',
    example: 'jean.dupont@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mot de passe',
    minLength: 6,
    example: 'motdepasse123',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Prénom du client',
    example: 'Jean',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Nom du client',
    example: 'Dupont',
  })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({
    description: "Rôle de l'utilisateur",
    enum: UserRole,
    example: UserRole.CLIENT,
    default: UserRole.CLIENT,
  })
  @IsOptional()
  @IsEnum(UserRole, {
    message: 'Le rôle doit être CLIENT, CHEF, LIVREUR ou ADMIN',
  })
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Numéro de téléphone français',
    example: '+33123456789',
  })
  @IsOptional()
  @IsPhoneNumber('FR')
  phone?: string;

  @ApiPropertyOptional({
    description: 'Adresse complète',
    example: '123 rue de la Paix',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'Ville',
    example: 'Paris',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description: 'Code postal',
    example: '75001',
  })
  @IsOptional()
  @IsString()
  postalCode?: string;
}
