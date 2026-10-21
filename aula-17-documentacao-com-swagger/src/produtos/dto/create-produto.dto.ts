import { ApiProperty } from '@nestjs/swagger';
export class CreateProdutoDto {
@ApiProperty({
example: 'Arroz 5kg',
description: 'Nome comercial do produto cadastrado',
})
nome: string;
@ApiProperty({
example: 25.90,
description: 'Preço unitário de venda',
})
preco: number;
@ApiProperty({
example: 'Alimentos',
description: 'Categoria à qual o produto pertence',
})
categoria: string;
}