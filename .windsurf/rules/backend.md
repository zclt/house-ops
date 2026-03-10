---
trigger: always_on
---

# Backend Rules

Backend desenvolvido em .NET 9.

Padrões:

- Controllers devem ser finos
- Lógica de negócio fica em Application
- Entidades ficam em Domain
- Repositórios são interfaces no Domain e implementações em Infrastructure

Boas práticas:

- utilizar async/await
- utilizar DTOs para comunicação externa
- não expor entidades diretamente