import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as cookieParser from 'cookie-parser';
import { TransformResponseInterceptor } from '../src/interceptors/transform.interceptor';
import { CreateCollectionDto } from '../src/collection/dto/create-collection-dto';
import * as request from 'supertest';

describe('CollectionController (e2e)', () => {
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

  it('/collections', async () => {
    const collection: CreateCollectionDto = {
      name: 'collectionTestNameCollection',
      description: 'collectionTestDecription',
    };

    const productsStart = await request(app.getHttpServer())
      .get('/api/products')
      .expect(200);
    if (productsStart.body.data.length > 0) {
      await Promise.all(
        productsStart.body.data.map((product) =>
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
    const collectionId = await request(app.getHttpServer())
      .post('/api/collections')
      .send(collection)
      .expect(201)
      .expect((response) => {
        expect(response.body.data).toBeDefined();
      });

    const collectionName = await request(app.getHttpServer())
      .get(`/api/collections/${collectionId.body.data}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.data.name).toEqual(collection.name);
      });

    for (let i = 0; i < 5; i++) {
      await request(app.getHttpServer())
        .post(`/api/products`)
        .field('name', 'productTestName' + i)
        .field('description', 'productTestDescription' + i)
        .field('price', 10)
        .field('promotionPrice', 5)
        .field('stock', 10)
        .field('collection', collectionName.body.data.name)
        .field('alertStock', 5)
        .field('details', 'productTestDetails' + i)
        .field('specifications', 'productTestSpecifications' + i)
        .field('dimensions', 'productTestDimensions' + i)
        .field('weight', 10)
        .field('material', 'productTestMaterial' + i)
        .expect(201);
    }

    const products = await request(app.getHttpServer())
      .get(`/api/collections/${collectionId.body.data}/products`)
      .expect(200)
      .expect((response) => {
        expect(response.body.data.length).toEqual(5);
      });
    await request(app.getHttpServer())
      .patch(`/api/collections/${collectionName.body.data.name}`)
      .send({
        name: 'newCollectionName',
        description: 'newCollectionDescription',
      })
      .expect(200);
    await request(app.getHttpServer())
      .get(`/api/collections/${collectionName.body.data.id}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.data.name).toEqual('newCollectionName');
        expect(response.body.data.description).toEqual(
          'newCollectionDescription',
        );
      });

    products.body.data.forEach(async (product) => {
      await request(app.getHttpServer())
        .delete(`/api/products/${product.id}`)
        .expect(200);
    });

    await request(app.getHttpServer())
      .delete(`/api/collections/${collectionId.body.data}`)
      .expect(200);
  });
});
