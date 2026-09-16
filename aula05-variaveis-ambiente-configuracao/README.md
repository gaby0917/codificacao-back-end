# Projeto Node.js com Configuração de Variáveis de Ambiente (`dotenv`)
Este repositório contém um exemplo prático de inicialização de uma aplicação Node.js utilizando a biblioteca `dotenv` para o gerenciamento seguro de variáveis de ambiente.



## 📂 Estrutura do Código e Arquivos
O projeto é composto pelos seguintes arquivos principais:
1. **`index.js` (ou arquivo principal):** Responsável por carregar as configurações do ambiente, validar se as chaves críticas estão presentes e iniciar os logs informativos do servidor.
2. **`.env`:** Arquivo onde as variáveis de ambiente locais são definidas (este arquivo **nunca** deve ser versionado no controle de versão).
3. **`.gitignore`:** Lista de arquivos e pastas ignoradas pelo Git para proteger dados sensíveis e dependências.

## 🛠️ Tecnologias Utilizadas
* **Node.js** - Ambiente de execução JavaScript.
* **dotenv** - Módulo zero-dependency que carrega variáveis de ambiente de um arquivo `.env` para o `process.env`.

## ⚙️ Configuração e Instalação
Siga os passos abaixo para configurar e rodar o projeto em sua máquina local:

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu computador.

### 2. Instalação de Dependências
Abra o terminal na pasta do projeto e instale a dependência `dotenv`:
```bash
npm install dotenv