# House Ops

Sistema completo para gerenciar compras semanais de mercado, desenvolvido com Clean Architecture e tecnologias modernas.

## 🏗️ Arquitetura

### Frontend (Next.js 14)
- **Framework**: Next.js com App Router
- **Estilização**: TailwindCSS
- **TypeScript**: Full type safety
- **Estrutura**:
  - `components/`: Componentes reutilizáveis
  - `features/`: Componentes de features específicas
  - `services/`: Lógica de chamada de API
  - `app/`: Páginas e layout

### Backend (.NET 9)
- **Framework**: ASP.NET Core Web API
- **Arquitetura**: Clean Architecture
- **Camadas**:
  - `Domain/`: Entidades e interfaces de domínio
  - `Application/`: Casos de uso, DTOs e serviços
  - `Infrastructure/`: Repositórios, DbContext e configurações
  - `API/`: Controllers, middleware e configuração

### Banco de Dados
- **SGBD**: PostgreSQL
- **ORM**: Entity Framework Core 9.0
- **Migrations**: Code-first approach

## 🚀 Funcionalidades

- ✅ **Registrar Compras**: Adicione compras semanais com data e mercado
- ✅ **Listar Compras**: Visualize todas as compras em tabela responsiva
- ✅ **Excluir Compras**: Remova compras indesejadas
- 🚧 **Gerenciar Itens**: Controle itens comprados (em desenvolvimento)
- 🚧 **Acompanhar Gastos**: Dashboard de gastos (em desenvolvimento)

## 🛠️ Tecnologias

### Frontend
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Lucide Icons

### Backend
- .NET 9
- ASP.NET Core Web API
- Entity Framework Core 9.0
- PostgreSQL
- AutoMapper (planejado)

### DevOps
- Docker
- Git
- Visual Studio Code

## 📋 Pré-requisitos

- Node.js 18+
- .NET 9 SDK
- PostgreSQL 15+ (ou Docker)
- Docker (opcional, para banco de dados)

## 🚀 Setup Rápido

### 1. Clonar repositório
```bash
git clone https://github.com/zclt/house-ops.git
cd house-ops
```

### 2. Configurar Banco de Dados
O projeto utiliza Docker Compose para gerenciar o PostgreSQL.

```bash
# Iniciar o banco de dados (e opcionalmente backend/frontend)
docker-compose up -d db
```
O banco será criado automaticamente com o nome `houseops_db`.

### 3. Banco de Dados e Migrações
Sempre execute estes comandos a partir da pasta `backend`:

#### Cenário A: Primeira Execução ou Alteração no Modelo (Entidades)
Se você alterou as classes de domínio ou é a primeira vez rodando o projeto com o banco limpo:
```bash
# Adicionar uma nova migração (substitua <Nome> conforme necessário)
dotnet ef migrations add <Nome> --project src/HouseOps.Infrastructure --startup-project src/HouseOps.API

# Aplicar ao banco de dados
dotnet ef database update --project src/HouseOps.Infrastructure --startup-project src/HouseOps.API
```

#### Cenário B: Apenas Sincronizar (Configuração Inicial ou Pull de Código)
Se as migrações já existem no projeto e o banco está rodando, mas vazio:
```bash
dotnet ef database update --project src/HouseOps.Infrastructure --startup-project src/HouseOps.API
```

### 4. Iniciar Backend
```bash
cd backend/src/HouseOps.API
dotnet run
# API rodará em http://localhost:5017
```

### 5. Iniciar Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend rodará em http://localhost:3000
```

## 📁 Estrutura do Projeto

```
house-ops/
├── backend/
│   ├── src/
│   │   ├── Domain/           # Entidades e interfaces
│   │   ├── Application/      # Casos de uso e DTOs
│   │   ├── Infrastructure/   # Repositórios e DbContext
│   │   └── API/             # Controllers e configuração
│   └── HouseOps.sln
├── frontend/
│   ├── app/                 # Páginas Next.js
│   ├── components/          # Componentes reutilizáveis
│   ├── features/           # Componentes de domínio
│   ├── services/           # API client
│   └── styles/             # CSS e Tailwind
├── .windsurf/              # Configurações do IDE
└── README.md
```

## 🔧 Endpoints da API

### Compras
- `GET /api/compras` - Listar todas as compras
- `GET /api/compras/{id}` - Obter compra por ID
- `POST /api/compras` - Criar nova compra
- `PUT /api/compras/{id}` - Atualizar compra
- `DELETE /api/compras/{id}` - Excluir compra
- `GET /api/compras/periodo` - Listar compras por período
- `GET /api/compras/mercado/{mercado}` - Listar compras por mercado

## 🧪 Testes

### Backend
```bash
cd backend
dotnet test
```

### Frontend
```bash
cd frontend
npm test
```

## 📝 Próximos Passos

- [ ] Implementar CRUD de Itens
- [ ] Adicionar validações no frontend
- [ ] Criar dashboard de gastos
- [ ] Implementar filtros avançados
- [ ] Adicionar autenticação
- [ ] Deploy em produção

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License.

## 👨‍💻 Autor

Desenvolvido com ❤️ por [zclt](https://github.com/zclt)
