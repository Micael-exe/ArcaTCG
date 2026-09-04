# ArcaTCG

Loja online de cartas colecionáveis (TCG) — booster packs, booster boxes, cartas avulsas, decks prontos e acessórios. Interface em React com backend em FastAPI, catálogo em memória (mock) e integração de compra externa via Shopee.

## ✨ Funcionalidades

- **Vitrine principal** — carrossel em destaque, seção de brindes/promoções, produtos em destaque, mais populares e ofertas
- **Página de categorias** (`/categorias`) — filtro por tipo de produto (derivado automaticamente do catálogo) e por tags, mais uma seção "Explorar por Elemento" visual
- **Busca funcional** (`/busca`) — sugestões em tempo real no cabeçalho e página de resultados dedicada, com normalização de acentos
- **Página de produto** (`/produto/:id`) — detalhes completos (ano, estoque, fabricante, idioma, condição), seletor de quantidade, botão de compra que direciona para o link externo do Shopee, e uma seção de **recomendações de compra** (cross-sell de outras categorias) logo abaixo da área de compra
- **Multilíngue** — Português, English e Español, com seletor de idioma no cabeçalho (persistido no navegador)
- **Página 404** personalizada, com busca embutida
- **Identidade visual própria** — tema escuro com destaque laranja, selo de autenticidade e faixa de confiança na página de produto

> **Removido intencionalmente:** telas de login/cadastro e carrinho de compras. A loja funciona como catálogo — a compra é finalizada no Shopee através do link configurado em cada produto.

## 🧱 Stack técnica

**Frontend:** React (Create React App + CRACO), React Router, Tailwind CSS, lucide-react
**Backend:** FastAPI + MongoDB (Motor) — atualmente usado apenas como base do projeto; as rotas de autenticação e carrinho existem no backend (`backend/server.py`) mas não são mais consumidas pelo frontend, já que essas telas foram removidas. Podem ser removidas do backend também caso não sejam necessárias para outros fins.

## 📁 Estrutura do projeto

```
frontend/
  src/
    components/     # Header, Footer, HeroCarousel, FreeGames, SectionRow, etc.
    pages/           # StorePage, CategoriesPage, SearchPage, ProductPage, NotFoundPage
    context/         # LanguageContext (i18n)
    i18n/            # Dicionários de tradução (pt/en/es)
    lib/             # Helpers (otimização de imagens)
    mock.js          # Catálogo de produtos e dados da loja
backend/
  server.py          # API FastAPI (MongoDB)
```

## 🚀 Rodando localmente

### Backend
```bash
cd backend
pip install -r requirements.txt
# configure backend/.env com MONGO_URL e DB_NAME
uvicorn server:app --reload --port 8000
```

### Frontend
```bash
cd frontend
yarn install
# configure frontend/.env com REACT_APP_BACKEND_URL=http://localhost:8000
yarn start
```

## 🛒 Configurando os links de compra (Shopee)

Cada produto em `frontend/src/mock.js` tem um campo `buyLink`. Enquanto estiver vazio, o botão "Comprar" na página de produto fica desabilitado com um aviso. Para ativar a compra, preencha com a URL real do produto no Shopee:

```js
{
  id: 'd1',
  title: 'Booster Pack — Obsidian Flames',
  // ...
  buyLink: 'https://shopee.com.br/seu-produto-aqui',
}
```

## 🌐 Traduções

O sistema de idiomas é próprio (sem dependência externa), em `frontend/src/i18n/translations.js` e `frontend/src/context/LanguageContext.jsx`. Cobre toda a interface (menus, botões, mensagens); nomes de produtos e categorias do catálogo permanecem no idioma original, como é comum em lojas do gênero.

## 📌 Notas

- As rotas de autenticação e carrinho ainda existem no backend (`/auth/*`, `/cart/*`, `/checkout`, `/orders`) mas não são mais chamadas pelo frontend.
- A pasta `.emergent/` (metadado da plataforma onde o projeto foi originalmente criado) foi removida — não é necessária para rodar ou hospedar o projeto.
