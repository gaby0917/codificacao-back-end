export const config = {
    runtime: 'edge',
};
export default async function handler(req: Request){
    const inicio = Date.now();
    const vercelId = req.headers.get('x-vercel-id') || 'N/A';
    const regiao = vercelId ? vercelId.split('::')[0]: 'local-dev';

    return new Response(
        JSON.stringify({
            mensagem: 'Função executada com sucesso!',
            horarioServidor: new Date().toLocaleString('pt-BR'),
            regiao: regiao,
            tempoExecução: `${Date.now() - inicio} ms`,
        }),
        {
            status: 200,
            headers: {'content-type': 'application/json'},
        }
    )
}