import { Controller, Get, Res, All } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  // Route pour l'API
  @Get('hello')
  getHello(): { message: string } {
    return { message: 'Hello from NestJS backend!' };
  }

  @All('*')
  serveApp(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'static-client', 'index.html'));
  }
}
