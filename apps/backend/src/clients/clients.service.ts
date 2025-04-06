import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        name: createClientDto.name,
      },
    });
  }

  async findAll() {
    return this.prisma.client.findMany();
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    if (!client) throw new NotFoundException(`Client ${id} not found`);
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return this.prisma.client.update({
      where: { id },
      data: {
        name: updateClientDto.name,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
