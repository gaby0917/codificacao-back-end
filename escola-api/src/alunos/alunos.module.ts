import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AlunoService } from "./alunos.service.js";
import { AlunoController } from "./alunos.controller.js";
import { Aluno, AlunoSchema } from "./schemas/alunos.schema.js";

@Module({
    imports:[MongooseModule.forFeature([{
        name: Aluno.name, schema: AlunoSchema
}])],
    controllers:[AlunoController],
    providers:[AlunoService],
})

export class alunosModule{}