import { Controller, Get, Patch, Param, Body, Delete } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Roles, Role } from './roles.decorator';

@Roles(Role.ADMIN)
@Controller('admin/users')
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async listUsers() {
    return this.prisma.user.findMany();
  }

  @Patch(':id/role')
  async updateUserRole(
    @Param('id') id: string,
    @Body('role') role: Role,
  ) {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: { role },
    });
  }

  @Patch(':id')
  async updateUserDetails(
    @Param('id') id: string,
    @Body() data: { firstName?: string; lastName?: string },
  ) {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (user?.role === 'ADMIN') {
      throw new Error('Cannot delete admin users');
    }
    return this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }
}
