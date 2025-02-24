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
  ],
})
export class AppModule {}
