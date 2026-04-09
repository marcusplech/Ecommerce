# E-commerce (demonstração)

Loja de exemplo construída com **Next.js** (App Router), focada em UI moderna, tema claro/escuro e fluxo de carrinho/checkout **sem backend** — catálogo fictício e carrinho persistido no navegador.

**Site em produção:** [https://mplechecommerce.vercel.app/](https://mplechecommerce.vercel.app/)

## Tecnologias

| Área                      | Escolha                                                    |
| ------------------------- | ---------------------------------------------------------- |
| Framework                 | [Next.js](https://nextjs.org/) 15 (App Router)             |
| Linguagem                 | [TypeScript](https://www.typescriptlang.org/)              |
| Estilos                   | [Tailwind CSS](https://tailwindcss.com/)                   |
| Dados assíncronos / cache | [TanStack Query](https://tanstack.com/query) (React Query) |
| Formulários               | [React Hook Form](https://react-hook-form.com/)            |

## Funcionalidades

- Listagem de produtos com imagens (Unsplash) via **`next/image`**, preços em BRL e **skeletons** ao carregar
- Carrinho com `localStorage` + React Query (mutações que atualizam o cache)
- Checkout em passos (endereço → revisão) e confirmação simulada
- Tema claro/escuro com persistência e Tailwind `darkMode: 'class'`
- **App Router:** `loading.tsx` por rota (grupo `(store)` para `/`), `error.tsx` com retry, metadados (Open Graph, `manifest`), **`robots.ts`** e **`sitemap.ts`**
- Link **“Ir para o conteúdo”** (acessibilidade) e `<main id="conteudo-principal">`

## Como executar

Requisitos: **Node.js** 18+ e npm.

```bash
npm install
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000).

### Scripts úteis

| Comando         | Descrição                                                     |
| --------------- | ------------------------------------------------------------- |
| `npm run dev`   | Servidor de desenvolvimento                                   |
| `npm run build` | Build de produção                                             |
| `npm run start` | Serve o build (após `build`)                                  |
| `npm run lint`  | ESLint (Next.js)                                              |
| `npm run clean` | Remove a pasta `.next` (útil se o cache do bundler corromper) |

## Estrutura (resumo)

```
src/app/
  (store)/             # Rota / — página inicial + loading
  cart/                # /cart + loading
  checkout/            # /checkout + loading
  layout.tsx           # Metadados, viewport, skip link, fonte
  error.tsx            # Erro de segmento com “Tentar outra vez”
  robots.ts / sitemap.ts
  components/          # UI (nav, produtos, carrinho, checkout, skeletons)
  contexts/            # Tema
  data/                # Catálogo fictício
  hooks/               # React Query
  libs/                # Carrinho local, tema, moeda, URL do site (SEO)
  types/
```

## Licença

Projeto pessoal / demonstração.
