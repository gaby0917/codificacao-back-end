import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { alunosModule } from './alunos/alunos.module.js';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import Joi from 'joi';
import type { ConfigType } from '@nestjs/config';
import databaseConfig from './config/database.config.js';
import authConfig from './config/auth.config.js';

@Module({
  imports: [
    alunosModule,
    ConfigModule.forRoot({
      isGlobal:true,
      load: [databaseConfig, authConfig],
      //validationSchema:Joi.object({
      //  NODE_ENV:Joi.string()
      //  .valid('desenvolvimento','producao','teste')
      //  .default('desenvolvimento'),
       // PORT:Joi.number().default(3000),
      //  MONGO_URI: Joi.string().required(),
       // JWT_SECRET: Joi.string().required(),
     // }),
    }), 
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[databaseConfig.KEY],
      useFactory:(dbconfig:ConfigType<typeof databaseConfig>)=>({     
        uri:dbconfig.uri,
        maxPoolSize: dbconfig.maxPollSize,
      }),
    }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}