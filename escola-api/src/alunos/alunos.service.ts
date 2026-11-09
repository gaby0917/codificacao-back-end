import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAlunoDto } from "./dto/create-aluno.dto.js";
import { UpdateAlunoDto } from "./dto/update-aluno.dto.js";
import { Aluno, AlunoDocument } from "./schemas/alunos.schema.js";

@Injectable()
export class AlunosService{
    constructor(@InjectModel(Aluno.name)private alunoModel: Model<AlunoDocument>){}

    async create(createAlunoDto: CreateAlunoDto):Promise<Aluno>{
        const createdAluno = new this.alunoModel(createAlunoDto);
        return createdAluno.save(); //!POST
    }

    async findAll(): Promise<Aluno[]>{
        return this.alunoModel.find().exec();
    } //!GET
    async findOne(id: string):Promise<Aluno>{
        const aluno = await this.alunoModel.findById(id).exec();
        if(!aluno){
            throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
        }
        return aluno;
    } //!GET
    async Update(id: string, updateAlunoDto: UpdateAlunoDto):Promise<Aluno>{
        const alunoAtualizado = await this.alunoModel.findByIdAndUpdate(id, updateAlunoDto, {
            new: true
        }).exec();
        if(!alunoAtualizado){
            throw new  NotFoundException(`Aluno com id ${id} não encontrado.`);
        }
        return alunoAtualizado;
    } //!PATCH
    async remove(id: string):Promise<Aluno>{
        const removerAluno = await this.alunoModel.findByIdAndDelete(id).exec();
        if(!removerAluno){
            throw new  NotFoundException(`Aluno com id ${id} não encontrado.`);
        }
        return removerAluno;
    } //!DELETE
    //!CURD
}