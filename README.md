
# RH Select - Sistema de Recrutamento e Seleção

Sistema para gerenciar candidatos, vagas e etapas de processo seletivo de forma simples e organizada.

## Tecnologias Utilizadas

### Frontend
- TypeScript
- React
- Vite
- Axios
- Tailwind CSS

### Backend (Para Implementação Futura)
- Go
- Gin Web Framework
- GORM
- PostgreSQL

## Executando o Projeto

### Com Docker (Recomendado)

1. Certifique-se de ter o Docker e Docker Compose instalados
2. Clone este repositório
3. Execute o comando abaixo na raiz do projeto:

```bash
docker-compose up -d
```

Acesse o frontend em: `http://localhost:3000`

### Desenvolvimento Local

Pré-requisitos:
- Node.js
- Yarn

Passos:

1. Clone o repositório
2. Instale as dependências:

```bash
yarn install
```

3. Execute o servidor de desenvolvimento:

```bash
yarn dev
```

## Funcionalidades

- Autenticação de usuários (login/cadastro)
- Painel administrativo
- Gerenciamento de candidatos
- Gerenciamento de vagas
- Gerenciamento de processos seletivos

## Estrutura do Projeto

```
├── public/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── contexts/         # Contextos React
│   ├── hooks/            # Hooks personalizados
│   ├── pages/            # Páginas da aplicação
│   ├── lib/              # Utilitários e funções auxiliares
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Ponto de entrada da aplicação
├── Dockerfile            # Configuração Docker
├── docker-compose.yml    # Configuração Docker Compose
└── README.md             # Documentação
```
