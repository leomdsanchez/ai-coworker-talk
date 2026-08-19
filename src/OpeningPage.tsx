import { templates, type SlideTemplate } from './templates'

function TemplateCard({ template }: { template: SlideTemplate }) {
  return (
    <article className="template-card">
      <header className="template-card__header">
        <h2>{template.title}</h2>
        <span>{template.tag}</span>
      </header>
      <p>{template.description}</p>
      <ul>
        {template.useCases.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <pre>
        <code>{template.markup}</code>
      </pre>
    </article>
  )
}

export function OpeningPage() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">AI Co-Worker Talk</p>
        <h1>Bem-vindo à base de slides da apresentação</h1>
        <p className="lead">
          Esta é a sua página de abertura. Abaixo estão templates base para montar
          os próximos slides sem refazer estrutura.
        </p>
      </section>

      <section className="card-block">
        <h2>Regras rápidas</h2>
        <ul>
          <li>Use uma frase por bloco de ideia.</li>
          <li>Deixe pouco texto e contraste alto.</li>
          <li>Use os templates abaixo como ponto de partida.</li>
        </ul>
      </section>

      <section>
        <h2>Templates prontos</h2>
        <div className="template-grid">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>
    </main>
  )
}
