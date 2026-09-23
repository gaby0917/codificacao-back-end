import { NestFactory } from '@nestjs/core';
import { AppModule} from './app.module.js';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'),{
    prefix: 'api/uploads',
  });

  await app.listen(3000);
  console.log('Aplicação rodando em http://localhost:3000');
}
  bootstrap();
