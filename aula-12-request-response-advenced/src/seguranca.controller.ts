import { Controller, Get, Headers, Res } from "@nestjs/common";
import { timeStamp } from "console";
import type { Response } from "express";

@Controller('secreto')
export class SegurancaController{
    @Get()
    acessarAreaSecreta(@Headers('x-api-key')apiKley: string, @Res() res:  Response,){
        if(apiKley === 'SENAI-2026'){
            res.setHeader('x-auth-status', 'verificado');
            return res.status(200).json({
                mensagem:'Acesso concedido ao conteúdo secreto!',
                timeStamp: new Date(),
            });
        }
        return res.status(403).json({
            erro: 'Forbidden',
            mensagem: 'Chave de API invalida ou ausente',
        })
    }
}