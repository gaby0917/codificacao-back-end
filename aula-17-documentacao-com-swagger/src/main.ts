import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
const app = await NestFactory.create(AppModule);
// Configuração da Especificação OpenAPI
const config = new DocumentBuilder()
.setTitle('API de Catálogo e Estoque')
.setDescription('Documentação técnica interativa e viva para integração')
.setVersion('1.0')
.addTag('produtos')
.addBearerAuth()
.build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document); // Endpoint acessível em /docs
await app.listen(3000);
}
bootstrap();