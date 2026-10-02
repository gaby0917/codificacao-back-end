import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller('status')
export class AppController {
  @Get()
  getPublic(){
    return {
      mensagem:'Rota Publica acessada com sucesso!',
      data: new Date(),
    }
  }

  @Get('secret')
  getSecret(){
    return{
      mensagem: 'Bem-Vindo a rota secreta!',
      data: new Date(),
    }
  }

  @Get('admin')
  getAdmin(){
    return {
      mensagem:'Bem-Vindo ao Painel Administrativo!',
      data: new Date(),
    }
  }
}
