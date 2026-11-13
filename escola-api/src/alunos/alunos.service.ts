import { Injectable,
     NotFoundException, 
     ConflictException,
     InternalServerErrorException,
     BadRequestException} from "@nestjs/common";
import { InjectModel} from "@nestjs/mongoose";
import { Model, QueryFilter } from "mongoose";
import{MongoServerError} from 'mongodb';
import { CreateAlunoDto } from "./dto/create-aluno.dto.js";
import { UpdateAlunoDto } from "./dto/update-aluno.dto.js";
import { Aluno, AlunoDocument } from "./schemas/alunos.schema.js";
import { tr } from "zod/locales";



@Injectable()
export class AlunoService{
    constructor(@InjectModel(Aluno.name) private alunoModel: Model<AlunoDocument>){}

    async create(createAlunoDto : CreateAlunoDto):Promise<Aluno>{

        try{
         const createdAluno = new this.alunoModel(createAlunoDto);
          return await createdAluno.save(); //!POST
        }catch(error: unknown){
              if( 
                error instanceof MongoServerError
                &&
                error.code === 11000
              ){
                throw new ConflictException('Matrícula duplicada. A matrícula deve ser única.');
            }
            throw new InternalServerErrorException('Erro ao Processar o cadastro do aluno. Por favor,tente novamente mais tarde.');
        }
        
    }

    async findAllPageFilter(
        page: number,
        limit: number,
        nome?: string,
        curso?: string, 
        orderBy?: string,
        orderDirection?: 'asc' | 'desc',
    ){
        
        const skip = (page - 1) * limit;
        const filtro: any = {ativo: true};

        if(nome){
            filtro.nome = {
                $regex: new RegExp(nome, 'i'),
            };
        }

        if(curso){
            filtro.cursos = curso;
        }

        const sort: any = {};

        if(orderBy){
            sort[orderBy] = orderDirection === 'desc' ? -1 : 1;
        }

        const [data, total] = await Promise.all([
            this.alunoModel.find(filtro).sort(sort).skip(skip).limit(limit).exec(),
            this.alunoModel.countDocuments(filtro).exec()
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
        return this.alunoModel.find().exec();
     }//!GET

    async findOne(id:string):Promise<Aluno>{
        const aluno=await this.alunoModel.findOne({
            _id: id, ativo: true
        })

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
        const removeAluno=await this.alunoModel.findByIdAndUpdate
        (id, {ativo: false}, {new: true}).exec();

        if(!removeAluno){
            throw new NotFoundException(`Aluno com id ${id} removido.`);
        }
        return removeAluno;

    } //!DELETE
    //!CURD

    async restore(id: string): Promise<Aluno>{
        const alunoRestaurado = await this.alunoModel.findByIdAndUpdate(
            id, {ativo: true}, {new: true}
        ).exec();

        if(!alunoRestaurado){
            throw new NotFoundException(`Aluno com ID ${id} não encontrado`)
        }

        return alunoRestaurado;
    }

}