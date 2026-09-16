import http from 'http';

const servidor = http.createServer((req,res) => {
    console.log(`[LOG] Método recebido: ${req.method} | ${req.url} `);

const cabecalhoPadrao ={
    'x-Contente-Type-Options' : 'nosniff',
    'x-frame-Options' : 'DENY',
};

if(req.url === '/status'){
    res.writeHead(200, {...cabecalhoPadrao, 'Contente-type': 'application/json'});
    res.end(JSON.stringify({servidor: 'Online'}));
}else{
    res.writeHead(404,{...cabecalhoPadrao, 'content-type': 'application/json'});
    res.end(JSON.stringify({erro: 'Página não encontrada'}));
}
});
servidor.listen(3000, () =>{
    console.log('Sentinela ativo na porta 3000');
});