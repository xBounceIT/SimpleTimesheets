import { Controller, Post, Body, HttpCode, HttpStatus, Res, Get, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.register(email, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(email, password);
    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: 'strict',
    });
    return { message: 'Logged in' };
  }

  @Get('me')
  async me(@Req() req: Request) {
    const token = req.cookies['jwt'];
    if (!token) return null;
    const payload = await this.authService.verifyToken(token);
    return payload;
  }
}
