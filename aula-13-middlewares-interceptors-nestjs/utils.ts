import { Injectable } from "@nestjs/common";

@Injectable()
export class DataHora{
    obter(): string{
        return new Date().toLocaleString('pt-BR');
    }
}