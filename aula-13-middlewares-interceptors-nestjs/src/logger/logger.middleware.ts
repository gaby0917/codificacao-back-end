import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataHora } from '../../utils.js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly dataHora: DataHora){}
  use(req: Request, res: Response, next: NextFunction) {
    const rota = req.originalUrl || req.url;
    console.log(`[LOG] Método: ${req.method} | Rota: ${rota} | Data: ${this.dataHora.obter()} | Hora: ${this.dataHora.obter}`);

     if (rota === '/status/secret') {
      const role = req.headers['api-key-secret'];

      if (role !== 'secret') {
        return res.status(403).json({
          statusCode: 403,
          mensagem: 'Acesso Negado: Privilégio necessário para acessar a rota secreta.',
          data: new Date(),
        });
      }
    }

    // Verificar se a rota começa por /admin
    if(rota.startsWith('/admin')){
      const role = req.headers['api-key-admin'];

      if(role !== 'administrator'){
        return res.status(403).json({
          statusCode: 403,
          mensagem: 'Acesso Negado: Privilégio de administrator necessário.',
          Data: new Date(),
        });
      }
    }
    next();
  }
}
