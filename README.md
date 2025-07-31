

Aplicação React que consome a API da Marvel para listar e detalhar personagens de quadrinhos.
## 🚀 Funcionalidades

- Listagem dos 20 primeiros personagens da API
- Filtro por nome e ordenação alfabética
- Favoritar até 5 personagens (com persistência local)
- Página de detalhes com os últimos 10 quadrinhos lançados
- Estilização personalizada baseada no layout fornecido (`home.png`, `hero-page.png`, `guide.png`)
- Navegação SPA com React Router

## 🧪 Tecnologias Utilizadas

- React + Vite
- React Router DOM
- Axios
- Context API
- LocalStorage para persistência de favoritos
- CSS


Crie um arquivo `.env` na raiz com as suas chaves da API Marvel:

```
VITE_MARVEL_PUBLIC_KEY=sua_public_key
VITE_MARVEL_PRIVATE_KEY=sua_private_key
```

## DEVLOG.md

```text
Dia 1 – Setup do projeto com React, Vite, e estrutura de pastas.
Dia 2 – Conexão com API da Marvel e construção da listagem de personagens.
Dia 3 – Implementação dos filtros, favoritos e página de detalhes.
Dia 4 – Estilização completa com base nos arquivos fornecidos e ajustes finais.
```

## Resposta Técnica

**Como você lidaria com o limite de 5 favoritos se estivesse usando Redux ou Zustand?**

Se estivesse utilizando Redux, criaria um slice para `favorites`, com ações para `addFavorite`, `removeFavorite`, e `toggleFavorite`. A lógica de verificação do limite de 5 seria aplicada no reducer ou middleware, bloqueando a adição ao atingir o limite. Já com Zustand, usaria um store global com lógica semelhante dentro da função `set` do estado.

Ambos permitiriam controle mais centralizado e previsível do estado da aplicação, principalmente com a vantagem de facilitar testes e persistência via middleware (como `redux-persist` ou `zustand/middleware`).

---

Feito por Ebson dos Santos