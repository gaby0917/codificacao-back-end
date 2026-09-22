import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { LivrosService } from "./livros.service.js";

@Controller('livros')
export class LivrosController {
    constructor(private readonly livroService: LivrosService){}

    @Get(':id')
    buscarPorId(@Param('id', ParseIntPipe) id:string){
        const numeroId = +id
        return this.livroService.encontrarPorId(numeroId);
    }
}