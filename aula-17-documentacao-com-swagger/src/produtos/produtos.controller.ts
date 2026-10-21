import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProdutoDto } from './dto/create-produto.dto.js';
@ApiTags('produtos')
@Controller('produtos')
export class ProdutosController {
@Post()
@ApiOperation({ summary: 'Cadastra um novo produto no catálogo' })
@ApiResponse({ status: 201, description: 'Produto cadastrado com sucesso.' })
@ApiResponse({ status: 400, description: 'Payload enviado contém dados inválidos.' })
async create(@Body() createProdutoDto: CreateProdutoDto) {
return {
id: 101,
...createProdutoDto,
criadoEm: new Date().toISOString(),
};
}
}