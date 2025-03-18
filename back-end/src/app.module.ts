import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CollectionModule } from './collection/collection.module';
import { ContactModule } from './contact/contact.module';
import { DatabaseModule } from './database/database.module';
import { ReviewModule } from './review/review.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AppController } from './app.controller';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    CustomerModule,
    DatabaseModule,
    ProductModule,
    CloudinaryModule,
    CollectionModule,
    ReviewModule,
    ContactModule,
    OrderModule,
    WishlistModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static-client'),
      // rootPath:
      //   '/mnt/c/Users/alexi/Documents/GitHub/Envtest/testRoutingNest/backend/static-client',
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
