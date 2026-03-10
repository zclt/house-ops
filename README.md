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
```bash
# Opção 1: Docker (recomendado)
docker run --name house-ops-postgres \
  -e POSTGRES_DB=house_ops \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15

# Opção 2: PostgreSQL local
# Criar banco "house_ops" manualmente
```

### 3. Rodar Migrations
```bash
cd backend/src/HouseOps.API
dotnet ef database update --project ../HouseOps.Infrastructure
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
