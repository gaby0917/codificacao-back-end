import { Injectable,  NotFoundException } from "@nestjs/common";

@Injectable()
export class ConvidadosService{
    private convidados = [
        {id: 1, nome: 'Alice', idade: 23},
        {id: 2, nome: 'Enzo', idade: 19},
        {id: 3, nome: 'Jamily', idade: 20},
        {id: 4, nome: 'Alessandra', idade: 18},
        {id: 5, nome: 'Hudson', idade: 21},
    ]; 

    finAll(){
        return this.convidados;
    }

    findOne(id: number){
        const convidados = this.convidados.find((c) => c.id === id);
        if(!convidados){
            throw new NotFoundException(`Convidados com ID ${id} não encontrado`);
        }
        return convidados;
    }
    atualizarIdade(id: number, idade: number){
        const convidado = this.findOne(id);
        convidado.idade = idade;
        return convidado;
    }
    removerConvidado(id: number){
        const index = this.convidados.findIndex((c) => c.id === id);
        if(index === -1){
            throw new NotFoundException(`Convidado com ID ${id} não encontrado`);
        }
        this.convidados.splice(index, 1);
    }
}