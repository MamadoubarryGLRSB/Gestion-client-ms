import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau client' })
  @ApiResponse({ status: 201, description: 'Client créé avec succès' })
  @ApiResponse({ status: 409, description: 'Email déjà utilisé' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les clients' })
  @ApiResponse({ status: 200, description: 'Liste des clients' })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un client par ID' })
  @ApiResponse({ status: 200, description: 'Client trouvé' })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un client' })
  @ApiResponse({ status: 200, description: 'Client supprimé' })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
