---
trigger: always_on
---

# Architecture Rules

Este projeto segue Clean Architecture.

Camadas do backend:

- Domain
- Application
- Infrastructure
- API

Regras:

- Domain não depende de nenhuma outra camada
- Application contém casos de uso
- Infrastructure contém acesso a banco e serviços externos
- API contém controllers e configuração

Utilizar padrão CQRS quando apropriado.
Utilizar Mediator para comunicação entre controllers e handlers.