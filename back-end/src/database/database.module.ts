import { Module, Global, Inject, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';

export interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
}

export const DATABASE_CONNECTION = Symbol('DATABASE_CONNECTION');
export const DATABASE_CONFIG = Symbol('DATABASE_CONFIG');

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONFIG,
      useFactory: (configService: ConfigService): DatabaseConfig => {
        const config = {
          host: configService.get<string>('DB_HOST'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          port: configService.get<number>('DB_PORT')
            ? parseInt(configService.get<string>('DB_PORT'), 10)
            : 3306,
        };

        console.log('Database Configuration:', config);

        return config;
      },
      inject: [ConfigService],
    },
    {
      provide: DATABASE_CONNECTION,
      inject: [DATABASE_CONFIG],
      useFactory: async (config: DatabaseConfig) => {
        try {
          const connection = await mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port,
            connectTimeout: 10000,
            waitForConnections: true,
          });

          console.log('Database connection established successfully');
          return connection;
        } catch (error) {
          console.error('Detailed Database Connection Error:', {
            message: error.message,
            code: error.code,
            sqlState: error.sqlState,
          });

          throw new Error(`Database connection failed: ${error.message}`);
        }
      },
    },
  ],
  exports: [DATABASE_CONNECTION, DATABASE_CONFIG],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly connection: mysql.Connection,
  ) {}

  async onModuleDestroy() {
    try {
      if (this.connection) {
        await this.connection.end();
        console.log('Database connection closed');
      }
    } catch (error) {
      console.error('Error closing database connection', error);
    }
  }
}
