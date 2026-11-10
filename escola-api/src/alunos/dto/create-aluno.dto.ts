import { IsString, IsInt, IsNotEmpty, IsArray, Min, ArrayMinSize } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAlunoDto{
@ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do aluno',
})
@IsString()
@IsNotEmpty({
    message: 'O nome é Obrigatório e não pode ser vazio.'
})
    nome: string;

   @ApiProperty({
    example: '19',
    description: 'Idade do aluno',
})
    @IsInt({
        message: 'A idade deve ser um número inteiro.'
    })

    @Min(0,{
        message: 'A idade não pode ser negativa.'
    })
    idade: number;

    @ApiProperty({
    example: '1234',
    description: 'Matrícula do aluno',
})
    @IsString()
    @IsNotEmpty({
        message: 'A matrícula é Obrigatória e não pode ser vazia.'
    })
    matricula: string;

    @ApiProperty({
    example: ['Ciências da Computação', 'Recursos Humanos'],
    description: 'Cursos em que o aluno está matriculado',
})
    @IsArray()
    @IsString({
        each: true,
        message: 'Cada curso deve ser um texto.'
    })
    @ArrayMinSize(1,{
        message: 'O aluno deve estar matriculado em pelo menos um curso.'
    })
    cursos: string[];
}