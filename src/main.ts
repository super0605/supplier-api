import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { GlobalErrorHandler } from './shared/handlers/global-exception.handler';
import { ResponseHandler } from './shared/handlers/response.handler';
import { fastifyHelmet } from 'fastify-helmet';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  );

  app.setGlobalPrefix('/');

  const options = new DocumentBuilder()
    .setTitle('Outdefine Api')
    .setDescription('The Outdefine Api documentation')
    .setVersion('1.0')
    .setBasePath('/')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new GlobalErrorHandler());

  // const versionHandler = app.get(VersionHandler);
  const responseHandler = app.get(ResponseHandler);

  // app.useGlobalInterceptors(versionHandler, responseHandler);
  app.useGlobalInterceptors(responseHandler);

  app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  await app.init();

  await app.listen(process.env.PORT || 31337, '0.0.0.0');
  const appUrl = await app.getUrl();
  console.log(`url ==> ${appUrl}`);
}

bootstrap();
