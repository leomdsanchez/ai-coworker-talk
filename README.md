# AI Co-Worker Talk

Portal de apresentação e slides em React + Vite.

Base aplicada a partir do projeto `curso-criativos-ia`.

## Uso local

O projeto usa Node.js 22, declarado em `.nvmrc`.

```bash
nvm use
npm ci
npm run dev
```

Validações:

```bash
npm run lint
npm test
npm run check
```

`npm run check` executa lint, testes, verificação de tipos e build de produção.

## Estrutura

```text
src/
├── components/
│   ├── BriefingPage.tsx      # Formulário de briefing salvo no navegador
│   └── LessonDeck.tsx        # Renderização reutilizável das aulas
├── data/
│   ├── course.ts             # Metadados do curso e cards
│   ├── lesson-1.ts           # Conteúdo da Aula 1
│   └── lesson-2.ts           # Conteúdo da Aula 2
├── navigation/
│   ├── useFullscreen.ts      # Tela cheia e atalho F
│   └── useSlideNavigation.ts # URL, teclado, scroll e swipe
├── types/
│   └── slide.ts              # Tipos compartilhados
├── utils/
│   └── events.ts             # Utilitários de interação do navegador
├── CoursePortal.tsx          # Home, panorama e seleção da aula
├── routes.ts                 # Convenção das URLs
├── routes.test.ts            # Testes das rotas por hash
└── main.tsx                  # Inicialização da aplicação
```

## URLs

Cada slide possui uma URL própria:

```text
#aula-1/portada
#aula-1/presentacion
#aula-1/mercado
#aula-2/portada
```

Ao atualizar a página, a apresentação permanece no slide atual. Os botões voltar e avançar do navegador também funcionam entre os slides visitados.

## Controles

- `→`, `Espaço`, `Enter` ou scroll para baixo: avançar
- `←`, `Backspace` ou scroll para cima: voltar
- swipe horizontal no celular: navegar
- `Home` / `End`: primeiro ou último slide
- `F`: tela cheia

## Regra para novas aulas

1. Criar o conteúdo da aula em `src/data/`.
2. Reutilizar `LessonDeck` e `useSlideNavigation`.
3. Registrar a aula no portal e nas rotas.
4. Não alterar textos por JavaScript global, `MutationObserver` ou CSS com `content`.
5. Manter conteúdo, navegação e apresentação visual em responsabilidades separadas.

## Publicação

Qualquer push para `main` dispara `.github/workflows/deploy.yml`. O GitHub Actions instala as dependências com `npm ci`, executa `npm run check` e publica `dist` no GitHub Pages:

`https://leomdsanchez.github.io/curso-criativos-ia/`

Antes de publicar:

```bash
npm run check
git push origin main
```

Também é possível disparar o workflow manualmente pela aba **Actions** do GitHub ou com:

```bash
gh workflow run deploy.yml --repo leomdsanchez/curso-criativos-ia
```
