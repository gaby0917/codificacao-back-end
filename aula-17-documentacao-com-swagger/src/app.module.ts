import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProdutosController } from './produtos/produtos.controller.js';

@Module({
  imports: [],
  controllers: [AppController, ProdutosController],
  providers: [AppService],
})
export class AppModule {}
