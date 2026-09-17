import { Controller, Post, Get, Body} from "@nestjs/common";
import { CriarConvidadoDto } from "./dto/criar-convidado.dto.js";

@Controller('convidados')
export class ConvidadosController{

    @Get()
    listarConvidados(){
        return['Amanda', 'Davi', 'Adam', 'Gabrielly', 'Yuri'];
    }

    @Post()
    criar(@Body() CriarConvidadoDto: CriarConvidadoDto){
        console.log('[PORTEIRO DIGITAL] Novo convidado recebido: ${CriarConvidadoDto.nome}');

        return {
            mensagem: 'Convidado ${CriarConvidadoDto.nome} adicionado com sucesso!',
        };
    }
}