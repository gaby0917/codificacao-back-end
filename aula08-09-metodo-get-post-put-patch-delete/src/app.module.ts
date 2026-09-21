import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConvidadosController } from './convidados.controller.js';
import { ConvidadosService } from './convidados.service.js';

@Module({
  imports: [],
  controllers: [AppController, ConvidadosController],
  providers: [AppService, ConvidadosService],
})
export class AppModule {}
