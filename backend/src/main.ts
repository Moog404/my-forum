import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const options = {
    origin: true, // attempted "origin":["http://localhost"]
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept,Authorization',
  };
  const app = await NestFactory.create(AppModule, { cors: options });
  await app.listen(3000);
}
bootstrap();
