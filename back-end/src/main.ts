import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './interceptors/transform.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
