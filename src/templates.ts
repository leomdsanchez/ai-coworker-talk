export type SlideTemplate = {
  id: string
  title: string
  tag: string
  description: string
  useCases: string[]
  markup: string
}

export const templates: SlideTemplate[] = [
  {
    id: 'title',
    title: 'Abertura',
    tag: 'Título',
    description: 'Use para slide de abertura da sessão ou tópico.',
    useCases: ['Abertura da palestra', 'Transição entre blocos'],
    markup: `<section className="slide-title">
  <p className="eyebrow">Seção</p>
  <h1>Título principal</h1>
  <p className="lead">Subtítulo curto, máximo uma linha.</p>
</section>`,
  },
  {
    id: 'problem',
    title: 'Problema',
    tag: 'Diagnóstico',
    description: 'Explique dor, impacto e urgência de forma objetiva.',
    useCases: ['Início de bloco', 'Quebra de contexto'],
    markup: `<section className="slide-problem">
  <h2>Qual problema resolvemos?</h2>
  <ul>
    <li>Ponto de dor atual</li>
    <li>Custo de manter assim</li>
    <li>Risco se ignorarmos</li>
  </ul>
</section>`,
  },
  {
    id: 'framework',
    title: 'Framework',
    tag: 'Estrutura',
    description: 'Apresenta etapas com padrão de leitura fácil.',
    useCases: ['Metodologia', 'Passo a passo', 'Processo'],
    markup: `<section className="slide-framework">
  <h2>Framework em 3 etapas</h2>
  <ol>
    <li>Etapa 1</li>
    <li>Etapa 2</li>
    <li>Etapa 3</li>
  </ol>
</section>`,
  },
  {
    id: 'insight',
    title: 'Insight + exemplo',
    tag: 'Argumento',
    description: 'Útil para conectar teoria a exemplo prático.',
    useCases: ['Case rápido', 'Comparação', 'Demonstração'],
    markup: `<section className="slide-insight">
  <h2>Insight</h2>
  <blockquote>"Frase de impacto curta e concreta."</blockquote>
  <p>Como aplicar em 30 segundos</p>
</section>`,
  },
  {
    id: 'closure',
    title: 'Fechamento',
    tag: 'Chamada',
    description: 'Finaliza seção e prepara próximo assunto.',
    useCases: ['Resumo', 'Checklist final'],
    markup: `<section className="slide-closure">
  <h2>Resumo</h2>
  <ul>
    <li>3 pontos-chave</li>
    <li>Decisão esperada</li>
    <li>Próximo passo</li>
  </ul>
</section>`,
  },
]
