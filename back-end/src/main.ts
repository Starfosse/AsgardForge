import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './interceptors/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  console.log('NODE_ENV:', process.env.NODE_ENV);
  const isProd = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://asgard-forge.vercel.app',
      'https://accounts.google.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  const port = process.env.PORT ?? 3000;
  console.log('PORT:', port);
  app.useStaticAssets(join(__dirname, '..', 'static-client'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
