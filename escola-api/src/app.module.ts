import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { alunosModule } from './alunos/alunos.module.js';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/escola_db'),
    alunosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
