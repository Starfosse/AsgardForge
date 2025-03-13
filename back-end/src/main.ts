import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './interceptors/transform.interceptor';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  console.log('NODE_ENV:', process.env.NODE_ENV);
  const isProd = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create(AppModule);
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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
