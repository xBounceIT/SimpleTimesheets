import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET || 'changeme', // Replace with secure secret in production
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
      }),
    }),
    PrismaModule,
  ],
  providers: [AuthService],
  controllers: [AuthController, AdminController],
  exports: [JwtModule],
})
export class AuthModule {}
