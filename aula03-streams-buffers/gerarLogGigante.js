import fs from 'fs';

const dataAtual = new Date().toISOString().split('T')[0];
const horaAtual = new Date().toLocaleTimeString();

const streamEscrita = fs.createWriteStream('servidor.log');
console.log('Gerando arquivo de log simulado...');

for(let i = 0; i < 200000; i++ ){
    const tipo = i % 7 === 0 ? 'ERROR' : 'INFO';
    streamEscrita.write(`[${dataAtual} - ${horaAtual}] Line ${i}: Status 200 - Mensagem de teste ${tipo}\n`);
}
streamEscrita.end();