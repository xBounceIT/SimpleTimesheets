import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      // Optionally configure Prisma Client options here
      // log: ['query'], // Example: Log all queries
    });
  }

  async onModuleInit() {
    // Connect to the database when the module is initialized
    await this.$connect();
    
    // Create default admin user if none exists
    const adminEmail = 'admin@example.com';
    const adminExists = await this.user.findUnique({
      where: { email: adminEmail }
    });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await this.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword
        }
      });
      console.log('Default admin user created');
    }
  }

  async onModuleDestroy() {
    // Disconnect from the database when the application is shutting down
    await this.$disconnect();
  }
}
