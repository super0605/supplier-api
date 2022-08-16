import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedModule } from './shared/shared.module';
import { HealthCheckModule } from './controllers/health-check/health-check.module';
import { SuppliersModule } from './controllers/suppliers/suppliers.module';

const envFilePath = `.env.${process.env.NODE_ENV}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    SharedModule,
    HealthCheckModule,
    SuppliersModule,
  ],
  controllers: [],
})
export class AppModule {}
