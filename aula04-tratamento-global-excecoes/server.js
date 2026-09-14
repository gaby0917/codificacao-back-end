import express from 'express';

const app = express();
app.use(express.json());

process.on('uncaughtException', (err) => {
    console.error('[ERROR DE PROCESSO = uncaughtException]: ', err.message);
});

process.on('unhandledRejection', (reason) =>{
    console.error('[PREMISE REJEITADA - unhandledRejection]: ', reason);
});
app.get('/sucesso', (req, res) => {
    res.json({sucess: true, message: 'Operação Realizada com Sucesso!'});
});

app.get('/erro-sincrono', (req, res, next) => {
    try{
        throw new Error('Falha ao processar a regra de negócio!');
    }catch(erro){
        next(erro);
    }
});

app.get('/erro-assincrono', async(req, res, next) => {
    try{
        await Promise.reject(new Error('Erro ao consultar banco de dados Externo!'));
    }catch(erro){
        next(erro);
    }
});

app.use((err, req, next) => {
    console.error(`[LOG DE ERRO INTERNO]: ${err.stack}`);

    const status = err.status || 500;
    req.status(status).json({
        sucess: false,
        message: err.message || 'ERRO INTERNO DO SERVIDOR'
    });
});

app.listen(3000, () => {
    console.log('Servidor Imortal rodando na porta 3000');
    console.log('teste 1: localhost:3000/sucesso');
    console.log('teste 2: localhost:3000/erro-sincrono');
    console.log('teste 3: localhost:3000/erro-assicrono');
})