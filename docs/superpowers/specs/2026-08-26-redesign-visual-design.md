# Redesign Visual — NL Caramelo Shop
**Data:** 2026-08-26  
**Escopo:** Página pública (`/`) — redesign visual completo

## Objetivo
Transformar o visual minimalista/neutro atual em identidade vibrante alinhada à marca NL Caramelo Shop (laranja + azul), com header de perfil estilo link-in-bio.

## Paleta
| Token | Valor | Uso |
|-------|-------|-----|
| Laranja primário | `#F97316` (orange-500) | Botões, destaques, badge Destaque |
| Azul secundário | `#3B82F6` (blue-500) | Gradiente, acento |
| Gradiente | `from-orange-500 to-blue-500` | Header, botão destaque, pill ativo |
| Background | `bg-orange-50/30` | Fundo da página |

## Componentes

### 1. Header de Perfil (novo — substitui `<header>` em `app/page.tsx`)
- Fundo: `bg-gradient-to-r from-orange-500 to-blue-500`, largura total
- Logo circular: `<img>` com borda branca 4px, 80px, centralizada
- Nome: "NL Caramelo Shop", branco, `font-black text-2xl`
- Slogan: "Produtos selecionados pra você", branco 80% opacidade, `text-sm`
- URL da logo: configurável via constante no topo de `app/page.tsx`

### 2. FilterBar (`components/FilterBar.tsx`)
- Pill inativo: fundo branco, `border-gray-200`, texto `text-gray-600`
- Pill ativo: `bg-gradient-to-r from-orange-500 to-blue-500 text-white border-transparent`
- Sem outras mudanças estruturais

### 3. FeaturedProduct (`components/FeaturedProduct.tsx`)
- Badge "★ Destaque": `bg-orange-500 text-white` (era `bg-yellow-400 text-yellow-900`)
- Botão "Comprar agora": `bg-gradient-to-r from-orange-500 to-blue-500 text-white` (era `bg-gray-900`)
- Sombra do card: adicionar `shadow-orange-100`

### 4. ProductCard (`components/ProductCard.tsx`)
- Botão "Comprar agora": `bg-orange-500 hover:bg-orange-600 text-white` (era `bg-gray-900`)
- Hover do card: `hover:shadow-orange-100 transition-shadow`
- Badge Amazon/Shopee: mantém cores atuais

### 5. `app/page.tsx`
- Background: `bg-orange-50/30 min-h-screen` no `<body>` ou no `<main>`
- Constante `LOGO_URL` no topo para configurar a foto de perfil
- Header substituído pelo novo componente de perfil

## Arquivos alterados
- `app/page.tsx` — novo header de perfil + background
- `components/FilterBar.tsx` — pills com gradiente ativo
- `components/FeaturedProduct.tsx` — badge + botão laranja/gradiente
- `components/ProductCard.tsx` — botão laranja

## Fora do escopo
- Admin panel (sem mudanças)
- Login page (sem mudanças)
- Estrutura de dados / Supabase (sem mudanças)
- Tipografia/fonte global (sem mudanças)
