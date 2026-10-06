import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const rota = req.originalUrl || req.url;
    console.log(`[LOG] Método: ${req.method} | Rota: ${rota}`);

    //verificar se a rota começa por / admin

    if(rota.startsWith('/admin')){
      const role = req.headers['api-key-admin'];

      if(role !== 'administrator'){
        return res.status(403).json({
          statusCode: 403,
          mensagem: 'Acesso Negado: Privilégio de administrator Necessário.',
          data: new Date(),
        });
      }
    }
    if(rota.startsWith('/secret')){
      const role = req.headers['api-key-secret'];

      if(role !== 'supervisor'){
        return res.status(403).json({
          statusCode: 403,
          mensagem: 'Acesso Negado: Privilégio de supervisor necessário.',
          data: new Date(),
        });
      }
    }
    next();
  }
}