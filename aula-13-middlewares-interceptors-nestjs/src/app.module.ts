import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller.js';
// import { AppService } from './app.service.js';
import { LoggerMiddleware } from './logger/logger.middleware.js';
import { MiddlewareConsumer } from '@nestjs/common';
import { DataHora } from '../utils.js';

@Module({
  // imports: [],
  controllers: [AppController],
  providers: [DataHora],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
