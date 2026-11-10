import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAlunoDto } from "./dto/create-aluno.dto.js";
import { UpdateAlunoDto } from "./dto/update-aluno.dto.js";
import { Aluno, AlunoDocument } from "./schemas/alunos.schema.js";


@Injectable()
export class AlunosService{
    constructor(@InjectModel(Aluno.name) private alunoModel: Model<AlunoDocument>){}

    async create(createAlunoDto : CreateAlunoDto):Promise<Aluno>{
        const createdAluno = new this.alunoModel(createAlunoDto);
        return createdAluno.save(); //!POST
    }


    async findAllPage(page: number, limit:number){
        
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.alunoModel.find().skip(skip).limit(limit).exec(),
            this.alunoModel.countDocuments().exec()
        ]);

        return {
            data,
            meta:{
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    } //!GET

     async findAll():Promise<Aluno[]>{
        return this.alunoModel.find().exec();
     }//!GET

    async findOne(id:string):Promise<Aluno>{
        const aluno=await this.alunoModel.findById(id).exec();

        if(!aluno){
            throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
        }
        return aluno;
    } //!GET
    async Update(id: string, UpdateAlunoDto: UpdateAlunoDto): Promise<Aluno>{
        const alunoAtualizado = await this.alunoModel.findByIdAndUpdate(id,UpdateAlunoDto, {
            new: true
        }).exec();

        if(!alunoAtualizado){
           throw new NotFoundException(`Aluno com id ${id} não encontrado`);
        }
        return alunoAtualizado;
    } //!PATCH
    async remove(id: string): Promise<Aluno>{
        const removeAluno=await this.alunoModel.findByIdAndDelete(id).exec();

        if(!removeAluno){
            throw new NotFoundException(`Aluno com id ${id} removido.`);
        }
        return removeAluno;

    } //!DELETE
    //!CURD
}