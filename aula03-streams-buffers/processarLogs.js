import fs from 'fs';
import readline from 'readline';

 async function filtrarErros(){

    console.log('INICIANDO PROCESSAMENTO COM STREAMS!');
    exibirConsumoMemoria('Início');

    const streamLeitura = fs.createReadStream('servidor.log');
    const streamEscrita = fs.createWriteStream('apenas_erros.log');
    const leitorLinhaaLinha = readline.createInterface({input: streamLeitura, crlfDelay: Infinity});
    let totalErros = 0;
    for await (const linha of leitorLinhaaLinha) {
        if (linha.includes('ERROR')){
            streamEscrita.write(linha + '\n');
            totalErros++;
        }
    }
    exibirConsumoMemoria('Fim');
    console.log(`Processamento Concluído! Quantidade de erros encontrados: ${totalErros} Linhas`);
 }
 function exibirConsumoMemoria(consumo){

    const memoria = process.memoryUsage();
    const rssMB = (memoria.rss / 1024 / 1024).toFixed(2);
    const heapMB = (memoria.heapUsed / 1024 / 1024).toFixed(2);

    console.log(`[${consumo}] RSS: ${rssMB} MB | Heap Utilizado: ${heapMB} MB`);
 }
 filtrarErros();