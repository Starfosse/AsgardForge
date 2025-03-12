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
      .overrideGuard(AuthGuard('jwt'))
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.customer = {
            id: '1',
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

    await request(app.getHttpServer()).get('/api/customers/me').expect(200);

    const responseRefresh = await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .set('Cookie', response.header['set-cookie'])
      .expect(201);

    expect(responseRefresh.body.access_token).toBeDefined();

    const access_token = response.header.location.split('=')[1];
    console.log('access_token === ', access_token);

    const responseLogout = await request(app.getHttpServer())
      .post('/api/auth/logout')
      .expect(201);

    expect(responseLogout.body.message).toBe('Logged out successfully');
  });
});
