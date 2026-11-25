export interface variaveisAmbiente{
    NODE_ENV:'desenvolvimento' | 'producao' | 'teste';
    PORT: number;
    MONGO_URI: string;
    JWT_SECRET: string;
}