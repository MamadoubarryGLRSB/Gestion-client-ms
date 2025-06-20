import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email du client',
    example: 'jean.dupont@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mot de passe',
    example: 'motdepasse123',
  })
  @IsString()
  password: string;
}
