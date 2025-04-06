import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimeEntriesService } from './time-entries.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';
import { Roles, Role } from '../auth/roles.decorator';

@Roles(Role.USER, Role.MANAGER, Role.SUB_MANAGER)
@Controller('time-entries')
export class TimeEntriesController {
  constructor(private readonly timeEntriesService: TimeEntriesService) {}

  @Post()
  create(@Body() createTimeEntryDto: CreateTimeEntryDto) {
    return this.timeEntriesService.create(createTimeEntryDto);
  }

  @Get()
  findAll() {
    return this.timeEntriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeEntriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeEntryDto: UpdateTimeEntryDto) {
    return this.timeEntriesService.update(+id, updateTimeEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeEntriesService.remove(+id);
  }
}
