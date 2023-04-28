import { CORS } from './constants/cors';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import morgan from 'morgan';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService); // Obtain the port

  app.enableCors(CORS); // Enable cors (Cross-Origin Resource Sharing

  app.use(morgan('dev')); // Logs de dev

  app.setGlobalPrefix('api'); // Global prefix. Now everything will be localhost:8000/api instead of localhost:8000
  await app.listen(configService.get('PORT'));
}
bootstrap();
