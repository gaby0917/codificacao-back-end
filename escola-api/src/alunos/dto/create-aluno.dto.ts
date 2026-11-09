import { IsString, IsInt, IsNotEmpty, IsArray, Min, ArrayMinSize } from "class-validator";

export class CreateAlunoDto{
@IsString()
@IsNotEmpty({
    message: 'O nome é Obrigatório e não pode ser vazio.'
})
    nome: string;

    @IsInt({
        message: 'A idade deve ser um número inteiro.'
    })

    @Min(0,{
        message: 'A idade não pode ser negativa.'
    })
    idade: number;

    @IsString()
    @IsNotEmpty({
        message: 'A matrícula é Obrigatória e não pode ser vazia.'
    })
    matricula: string;

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