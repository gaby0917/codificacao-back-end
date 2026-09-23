import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MidiaController } from './midia.controller.js';

@Module({
  imports: [],
  controllers: [AppController, MidiaController],
  providers: [AppService],
})
export class AppModule {}
