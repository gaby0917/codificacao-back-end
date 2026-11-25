import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import databaseConfig from './config/database.config.js';
import authConfig from './config/auth.config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerDatabase = new Logger ('DATABASE');
  const loggerAuth = new Logger ('Auth');

  const configDb = app.get<ConfigType <typeof databaseConfig>>(databaseConfig.KEY);
  const configAuth = app.get<ConfigType <typeof authConfig>>(authConfig.KEY);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  //! configuração do Swagger
  const config = new DocumentBuilder()
  .setTitle('API Escola')
  .setDescription('API para gerenciamento de alunos')
  .setVersion('1.0.0')
  .addTag('alunos')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
  Logger.log(`API escola rodando na porta ${await app.getUrl()}`,'Port');
  loggerDatabase.log(`Conectado em: ${configDb.uri}`);
  loggerDatabase.log(`Pool Máximo: ${configDb.maxPollSize}`);
  loggerAuth.log(`Chave secreta "que não é Mais secreta: "${configAuth.jwtSecret}`);
  loggerAuth.log(`Tempo de Validade da Chave ${configAuth.jwtExpiresIn}`);

}
await bootstrap();