import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './interceptors/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://asgard-forge.vercel.app',
      'https://asgardforge.onrender.com',
      'https://accounts.google.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.useGlobalInterceptors(new TransformResponseInterceptor());

  // const staticPath = join(__dirname, '..', 'static-client');
  // app.use(express.static(staticPath));
  // app.use('*', (req, res, next) => {
  //   if (req.baseUrl.startsWith('/api')) {
  //     return next();
  //   }
  //   res.sendFile(path.join(staticPath, 'index.html'));
  // });

  const port = process.env.PORT ?? 3000;
  console.log('PORT:', port);

  await app.listen(port);
}
bootstrap();
