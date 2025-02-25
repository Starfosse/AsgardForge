import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TransformResponseInterceptor } from '../src/interceptors/transform.interceptor';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard('google'))
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.customer = {
            google_id: '123',
            first_name: 'John',
            last_name: 'Doe',
            email: 'test@test.fr',
          };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.enableCors({
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    });
    app.useGlobalInterceptors(new TransformResponseInterceptor());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/google/callback should redirect with token and set cookie', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/auth/google/callback')
      .expect(302);

    expect(response.header.location).toMatch(
      /^http:\/\/localhost:5173\/login\/success\?token=/,
    );

    expect(response.header['set-cookie'][0]).toContain('refresh_token=');
    expect(response.header['set-cookie'][0]).toContain('HttpOnly');
    expect(response.header['set-cookie'][0]).toContain('Secure');
  });
});
