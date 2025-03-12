import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import { CreateCollectionDto } from 'src/collection/dto/create-collection-dto';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TransformResponseInterceptor } from '../src/interceptors/transform.interceptor';

describe('ReviewController (e2e)', () => {
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
            google_id: '123Review',
            first_name: 'JohnReview',
            last_name: 'DoeReview',
            email: 'test@test.frReview',
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

  it('/reviews', async () => {
    const collection: CreateCollectionDto = {
      name: 'collectionTestNameProduct',
      description: 'collectionTestDecription',
    };

    await request(app.getHttpServer())
      .get('/api/auth/google/callback')
      .expect(302);

    const products = await request(app.getHttpServer())
      .get('/api/products')
      .expect(200);
    if (products.body.data.length > 0) {
      await Promise.all(
        products.body.data.map((product) =>
          request(app.getHttpServer()).delete(`/api/products/${product.id}`),
        ),
      );
    }

    const collections = await request(app.getHttpServer())
      .get('/api/collections')
      .expect(200);
    if (collections.body.data.length > 0) {
      await Promise.all(
        collections.body.data.map((collection) =>
          request(app.getHttpServer()).delete(
            `/api/collections/${collection.id}`,
          ),
        ),
      );
    }
    await request(app.getHttpServer())
      .post('/api/collections')
      .send(collection)
      .expect(201);
    const productId = await request(app.getHttpServer())
      .post('/api/products')
      .field('name', 'Test Product')
      .field('description', 'Test Description')
      .field('price', '100')
      .field('promotionPrice', '90')
      .field('stock', '100')
      .field('collection', collection.name)
      .field('alertStock', '10')
      .field('details', 'Test Details')
      .field('specifications', 'Test Specifications')
      .field('dimensions', 'Test Dimensions')
      .field('weight', '100')
      .field('material', 'Test Material')
      // .attach('image', 'path/to/test-image.jpg')
      .expect(201)
      .expect((response) => {
        expect(response.body.data).toBeDefined();
      });
    const review: CreateReviewDto = {
      productId: productId.body.data,
      customerId: 1,
      rating: 5,
      review: 'Test Review',
    };

    await request(app.getHttpServer())
      .post('/api/reviews')
      .send(review)
      .expect(201);

    await request(app.getHttpServer())
      .get(`/api/reviews/${productId.body.data}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.data).toBeDefined();
        expect(response.body.data[0].rating).toBe(5);
        expect(response.body.data[0].review).toBe('Test Review');
      });
  });
});
