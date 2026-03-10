---
trigger: always_on
---

# Frontend Rules

Frontend desenvolvido em Next.js.

Padrões:

- utilizar App Router
- utilizar React Server Components quando possível
- separar componentes em:

components/
features/
services/

Regras:

- lógica de chamada de API deve ficar em services
- componentes devem ser pequenos e reutilizáveis