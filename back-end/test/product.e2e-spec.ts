import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { TransformResponseInterceptor } from '../src/interceptors/transform.interceptor';
import { CreateCollectionDto } from 'src/collection/dto/create-collection-dto';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

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

  //créer une collection au préalable
  it('/products (POST)', async () => {
    const collection: CreateCollectionDto = {
      name: 'collectionTestName',
      description: 'collectionTestDecription',
    };

    const products = await request(app.getHttpServer())
      .get('/api/products')
      .expect(200);
    console.log('products === ', products.body.data);
    if (products.body.data.length > 0) {
      products.body.data.forEach(async (product) => {
        await request(app.getHttpServer()).delete(
          `/api/products/${product.id}`,
        );
      });
    }

    const collections = await request(app.getHttpServer())
      .get('/api/collections')
      .expect(200);
    console.log('collections === ', collections.body.data);
    if (collections.body.data.length > 0) {
      collections.body.data.forEach(async (collection) => {
        await request(app.getHttpServer()).delete(
          `/api/collections/${collection.id}`,
        );
      });
    }

    const collectionId = await request(app.getHttpServer())
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
        console.log('response.body.data === ', response.body.data);
        expect(response.body.data).toBeDefined();
      });

    await request(app.getHttpServer())
      .delete(`/api/products/${productId.body.data}`)
      .expect(200);

    await request(app.getHttpServer()).delete(
      `/api/collections/${collectionId.body.data}`,
    );
  });
});
