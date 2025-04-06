import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';

@Injectable()
export class TimeEntriesService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateTimeEntryDto) {
    return this.prisma.timeEntry.create({
      data: {
        userId: createDto.userId,
        clientId: createDto.clientId,
        projectId: createDto.projectId,
        taskId: createDto.taskId,
        duration: createDto.duration,
        notes: createDto.notes,
        date: createDto.date,
      },
    });
  }

  async findAll() {
    return this.prisma.timeEntry.findMany();
  }

  async findOne(id: number) {
    const entry = await this.prisma.timeEntry.findUnique({
      where: { id },
    });
    if (!entry) throw new NotFoundException(`TimeEntry ${id} not found`);
    return entry;
  }

  async update(id: number, updateDto: UpdateTimeEntryDto) {
    return this.prisma.timeEntry.update({
      where: { id },
      data: {
        userId: updateDto.userId,
        clientId: updateDto.clientId,
        projectId: updateDto.projectId,
        taskId: updateDto.taskId,
        duration: updateDto.duration,
        notes: updateDto.notes,
        date: updateDto.date,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.timeEntry.delete({
      where: { id },
    });
  }
}
