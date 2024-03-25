/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors({
    origin: '*', // Replace with the origin of your Angular app
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    credentials: true, // Enable sending cookies from the client
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      enableDebugMessages: true,
    })
  );
  
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
