import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Bot,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileCode2,
  FilePenLine,
  FileText,
  Goal,
  Inbox,
  MailOpen,
  MessageCircle,
  Network,
  PackageOpen,
  PlugZap,
  Puzzle,
  Search,
  Settings2,
  Tags,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { useFullscreen } from '../navigation/useFullscreen'
import { useSlideNavigation } from '../navigation/useSlideNavigation'
import type { CopyLinkAction, CopyTextAction, ExternalLinkAction, Slide, SlideDeck, SlideIcon } from '../types/slide'
import { copyText } from '../utils/clipboard'

type LessonDeckProps = {
  lessonNumber: number
  slides: SlideDeck
  courseTitle?: string
}

const slideIcons: Record<SlideIcon, LucideIcon> = {
  message: MessageCircle,
  task: ClipboardCheck,
  agent: Bot,
  network: Network,
  brain: BrainCircuit,
  machine: Settings2,
  target: Goal,
  instructions: FileText,
  skill: Puzzle,
  tool: Wrench,
  plug: PlugZap,
  package: PackageOpen,
  trigger: CalendarClock,
  approval: CheckCircle2,
  inbox: Inbox,
  search: Search,
  mail: MailOpen,
  download: Download,
  draft: FilePenLine,
  tag: Tags,
  script: FileCode2,
}

function ConceptIcon({ name }: { name: SlideIcon }) {
  const Icon = slideIcons[name]
  return <Icon aria-hidden="true" strokeWidth={1.8} />
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d={direction === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
    </svg>
  )
}

function FullscreenIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  )
}

function CopyLinkButton({ action }: { action: CopyLinkAction }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      const url = new URL(action.hash, window.location.href).toString()
      await copyText(url)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button className="slide-copy-link" type="button" onClick={() => void handleCopy()}>
      {copied ? 'Enlace copiado' : action.label}
    </button>
  )
}

function CopyTextButton({ action }: { action: CopyTextAction }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await copyText(action.content)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button className="slide-copy-link" type="button" onClick={() => void handleCopy()}>
      {copied ? action.successLabel ?? 'Texto copiado' : action.label}
    </button>
  )
}

function ExternalLinkButton({ action }: { action: ExternalLinkAction }) {
  if (!action.url) {
    return <p className="slide-link-pending">{action.unavailableLabel ?? 'El enlace estará disponible antes de la clase.'}</p>
  }

  return (
    <a
      className="slide-copy-link slide-external-link"
      href={action.url}
      rel={action.url.startsWith('#') ? undefined : 'noreferrer'}
      target={action.url.startsWith('#') ? undefined : '_blank'}
    >
      {action.label} {!action.url.startsWith('#') && <span aria-hidden="true">↗</span>}
    </a>
  )
}

function SlideHeading({ slide }: { slide: Slide }) {
  return (
    <header className="slide-heading">
      <p className="eyebrow">{slide.eyebrow}</p>
      <h2>{slide.title}</h2>
      {slide.subtitle && <p className="lead">{slide.subtitle}</p>}
    </header>
  )
}

function PromptLibrary({ slide }: { slide: Slide }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [flowName, setFlowName] = useState('')
  const [recurrence, setRecurrence] = useState('')
  const [formError, setFormError] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const toastTimeoutRef = useRef<number | null>(null)
  const activeCard = activeIndex === null ? null : slide.cards?.[activeIndex]

  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])

  useEffect(() => () => {
    if (toastTimeoutRef.current !== null) window.clearTimeout(toastTimeoutRef.current)
  }, [])

  const openModal = (index: number) => {
    setActiveIndex(index)
    setRecurrence('')
    setFormError('')
  }

  const handleCopy = async () => {
    if (activeIndex === null || !activeCard) return

    const normalizedFlowName = flowName.trim()
    const normalizedRecurrence = recurrence.trim()

    if (!normalizedFlowName || !normalizedRecurrence) {
      setFormError('Completá el nombre del flujo y la recurrencia.')
      return
    }

    const content = (activeCard.prompt ?? activeCard.description ?? '')
      .replace(/\{\{NOMBRE_FLUJO\}\}/g, normalizedFlowName)
      .replace(/\{\{RECURRENCIA\}\}/g, normalizedRecurrence)

    try {
      await copyText(content)
      setCopiedIndex(activeIndex)
      setToastMessage(`Prompt de ${activeCard.title} copiado al portapapeles.`)
      setActiveIndex(null)
      if (toastTimeoutRef.current !== null) window.clearTimeout(toastTimeoutRef.current)
      toastTimeoutRef.current = window.setTimeout(() => {
        setToastMessage('')
        toastTimeoutRef.current = null
      }, 2900)
      window.setTimeout(() => setCopiedIndex((current) => current === activeIndex ? null : current), 1800)
    } catch {
      setFormError('No fue posible copiar el prompt. Intentá nuevamente.')
    }
  }

  return (
    <>
      <div className="prompt-library-grid">
        {slide.cards?.map((card, index) => (
          <article className="prompt-library-card" key={card.title}>
            <div className="prompt-library-card-heading">
              <span><ConceptIcon name={card.icon} /></span>
              <h3>{card.title}</h3>
            </div>
            <p>{card.description}</p>
            <button type="button" onClick={() => openModal(index)}>
              {copiedIndex === index ? 'Prompt copiado' : 'Configurar y copiar'}
            </button>
          </article>
        ))}
      </div>

      {activeCard && (
        <div
          className="prompt-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null)
          }}
        >
          <section
            aria-labelledby="prompt-modal-title"
            aria-modal="true"
            className="prompt-modal"
            role="dialog"
          >
            <button
              aria-label="Cerrar"
              className="prompt-modal-close"
              type="button"
              onClick={() => setActiveIndex(null)}
            >
              ×
            </button>
            <p className="prompt-modal-eyebrow">Configurar prompt</p>
            <h3 id="prompt-modal-title">Programación de {activeCard.title.toLowerCase()}</h3>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                void handleCopy()
              }}
            >
              <label>
                <span>Nombre del flujo</span>
                <input
                  autoFocus
                  type="text"
                  value={flowName}
                  placeholder="Ej.: Flujo anuncios test"
                  onChange={(event) => {
                    setFlowName(event.target.value)
                    setFormError('')
                  }}
                />
              </label>
              <label>
                <span>Recurrencia</span>
                <input
                  type="text"
                  value={recurrence}
                  placeholder="Ej.: todos los lunes a las 08:00"
                  onChange={(event) => {
                    setRecurrence(event.target.value)
                    setFormError('')
                  }}
                />
              </label>
              {formError && <p className="prompt-modal-error" role="alert">{formError}</p>}
              <div className="prompt-modal-actions">
                <button className="is-secondary" type="button" onClick={() => setActiveIndex(null)}>Cancelar</button>
                <button className="is-primary" type="submit">Copiar prompt</button>
              </div>
            </form>
          </section>
        </div>
      )}

      {toastMessage && (
        <div aria-live="polite" className="prompt-copy-toast" role="status">
          <CheckCircle2 aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  )
}

function ConnectorChat({ slide }: { slide: Slide }) {
  const messages = slide.chat ?? []
  const [visibleCount, setVisibleCount] = useState(0)
  const [isWaiting, setIsWaiting] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | null>(null)
  const totalRounds = Math.ceil(messages.length / 2)
  const currentRound = Math.ceil(visibleCount / 2)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [isWaiting, visibleCount])

  useEffect(() => () => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
  }, [])

  const revealNextRound = () => {
    if (isWaiting || visibleCount >= messages.length) return

    const nextCount = Math.min(messages.length, visibleCount + 1)
    setVisibleCount(nextCount)

    if (nextCount < messages.length) {
      setIsWaiting(true)
      timeoutRef.current = window.setTimeout(() => {
        setVisibleCount(Math.min(messages.length, nextCount + 1))
        setIsWaiting(false)
        timeoutRef.current = null
      }, 760)
    }
  }

  const hidePreviousRound = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsWaiting(false)
    setVisibleCount((count) => Math.max(0, count - (count % 2 === 0 ? 2 : 1)))
  }

  return (
    <div className="lesson-three-layout connector-chat-layout">
      <SlideHeading slide={slide} />
      <section className="connector-chat-shell" aria-label="Conversación entre la inteligencia artificial y Gmail">
        <header className="connector-chat-toolbar">
          <div>
            <span><ConceptIcon name="mail" /></span>
            <strong>Conector Gmail</strong>
          </div>
          <small><i aria-hidden="true" /> Conectado</small>
        </header>

        <div className="connector-conversation" ref={scrollRef} aria-live="polite">
          {visibleCount === 0 && (
            <div className="connector-chat-empty">
              <ConceptIcon name="message" />
              <p>Usa los controles para iniciar la conversación.</p>
            </div>
          )}

          {messages.slice(0, visibleCount).map((message) => (
            <article className={`connector-message is-${message.role}`} key={`${message.role}-${message.text}`}>
              <header>
                <span>{message.role === 'agent' ? <ConceptIcon name="agent" /> : <ConceptIcon name="mail" />}</span>
                <strong>{message.label}</strong>
              </header>
              <div className="connector-message-content">
                {message.mention && <span className="connector-mention">{message.mention}</span>}
                <h3>{message.text}</h3>
                {message.items && (
                  <ul>
                    {message.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
                {message.details && (
                  <dl>
                    {message.details.map((detail) => (
                      <div key={detail.label}>
                        <dt>{detail.label}</dt>
                        <dd>{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </article>
          ))}

          {isWaiting && (
            <article className="connector-message is-connector is-typing" aria-label="El conector está respondiendo">
              <header>
                <span><ConceptIcon name="mail" /></span>
                <strong>Conector Gmail</strong>
              </header>
              <div className="connector-typing-dots" aria-hidden="true"><i /><i /><i /></div>
            </article>
          )}
        </div>

        <footer className="connector-chat-controls">
          <button type="button" aria-label="Interacción anterior" disabled={visibleCount === 0} onClick={hidePreviousRound}>
            <ArrowIcon direction="left" />
          </button>
          <div>
            <span>{visibleCount === 0 ? 'Lista para comenzar' : `Interacción ${currentRound} de ${totalRounds}`}</span>
            <div className="connector-chat-dots" aria-hidden="true">
              {Array.from({ length: totalRounds }, (_, index) => (
                <i className={index < currentRound ? 'is-active' : ''} key={index} />
              ))}
            </div>
          </div>
          <button type="button" aria-label="Siguiente interacción" disabled={isWaiting || visibleCount >= messages.length} onClick={revealNextRound}>
            <ArrowIcon direction="right" />
          </button>
        </footer>
      </section>
      {slide.highlight && <div className="lesson-three-key-message">{slide.highlight}</div>}
    </div>
  )
}

function SlideContent({ slide }: { slide: Slide }) {
  if (slide.kind === 'cover') {
    return (
      <div className="cover-layout">
        <div>
          <div className="course-mark">IA</div>
          <p className="eyebrow">{slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          {slide.subtitle && <p className="lead">{slide.subtitle}</p>}
        </div>
        <div className="cover-orbit" aria-hidden="true"><span /><span /><span /></div>
      </div>
    )
  }

  if (slide.kind === 'pillars' && slide.pillars) {
    return (
      <div className="slide-content">
        <SlideHeading slide={slide} />
        <div className="pillar-summary">
          {slide.pillars.map((pillar) => <span key={pillar.title}>{pillar.title}</span>)}
        </div>
      </div>
    )
  }

  if (slide.kind === 'case') {
    return (
      <div className="case-layout">
        <section>
          <SlideHeading slide={slide} />
          {slide.highlight && <div className="highlight-box">{slide.highlight}</div>}
        </section>
        <section className="case-card">
          <div className="pet-visual" aria-hidden="true">🐕</div>
          <ul className="bullet-list">
            {slide.bullets?.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
        </section>
      </div>
    )
  }

  if (slide.kind === 'briefing') {
    return (
      <div className="briefing-slide-layout">
        <SlideHeading slide={slide} />
        <section className="briefing-slide-card">
          <ul>
            {slide.bullets?.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
        </section>
      </div>
    )
  }

  if (slide.kind === 'comparison' && slide.comparison) {
    return (
      <div className="comparison-layout">
        <SlideHeading slide={slide} />
        <div className="comparison-grid">
          {slide.comparison.map((column) => (
            <section
              className={`comparison-card is-${column.tone ?? 'neutral'}`}
              key={column.title}
            >
              <header>
                <span>{column.label}</span>
                <h3>{column.title}</h3>
              </header>
              <ul>
                {column.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p>{column.footer}</p>
            </section>
          ))}
        </div>
      </div>
    )
  }

  if (slide.kind === 'resources' && slide.references) {
    return (
      <div className="resource-layout">
        <SlideHeading slide={slide} />
        <div className="resource-grid">
          {slide.references.map((reference) => (
            <a
              className="resource-card"
              href={reference.url}
              key={reference.name}
              rel="noreferrer"
              target="_blank"
            >
              <span>{reference.focus}</span>
              <h3>{reference.name}</h3>
              <p>{reference.description}</p>
              <strong>Visitar <span aria-hidden="true">↗</span></strong>
            </a>
          ))}
        </div>
      </div>
    )
  }

  if (slide.kind === 'concept-grid' && slide.cards) {
    return (
      <div className="lesson-three-layout concept-grid-layout">
        <SlideHeading slide={slide} />
        <div className="concept-card-grid">
          {slide.cards.map((card, index) => (
            <article className="concept-card" key={card.title} style={{ animationDelay: `${index * 90}ms` }}>
              <div className="concept-card-topline">
                <span className="concept-icon"><ConceptIcon name={card.icon} /></span>
                {card.label && <strong>{card.label}</strong>}
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    )
  }

  if (slide.kind === 'agent-comparison' && slide.cards) {
    return (
      <div className="lesson-three-layout agent-comparison-layout">
        <SlideHeading slide={slide} />
        <div className="agent-comparison-visual">
          {slide.cards.map((card, index) => (
            <div className="agent-comparison-item" key={card.title}>
              <article className={`agent-system-card ${index > 0 ? 'is-agent' : ''}`} tabIndex={0}>
                <div className="agent-system-copy">
                  {card.label && <span>{card.label}</span>}
                  <h3>{card.title}</h3>
                </div>
                <div className="agent-system-icon"><ConceptIcon name={card.icon} /></div>
              </article>
              {card.description && <p className="agent-system-caption">{card.description}</p>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (slide.kind === 'agent-cycle' && slide.steps) {
    return (
      <div className="lesson-three-layout agent-cycle-layout">
        <SlideHeading slide={slide} />
        <div className="agent-cycle" aria-label="Ciclo de trabajo de un agente">
          {slide.steps.map((step, index) => (
            <article className="agent-cycle-step" key={step.title} tabIndex={0}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        {slide.highlight && <p className="agent-cycle-note">{slide.highlight}</p>}
      </div>
    )
  }

  if (slide.kind === 'agent-environment' && slide.cards) {
    return (
      <div className="lesson-three-layout agent-environment-layout">
        <SlideHeading slide={slide} />
        <div className="agent-environment-map">
          <div className="agent-environment-ring is-outer" aria-hidden="true" />
          <div className="agent-environment-ring is-inner" aria-hidden="true" />
          <div className="agent-environment-track">
            {slide.cards.map((card, index) => (
              <div className={`environment-orbit-node ${index < 3 ? 'is-focus' : 'is-secondary'}`} key={card.title}>
                <div className="environment-orbit-node-inner">
                  <span><ConceptIcon name={card.icon} /></span>
                  <strong>{card.title}</strong>
                </div>
              </div>
            ))}
          </div>
          <div className="agent-environment-core">
            <ConceptIcon name="agent" />
            <strong>Agente</strong>
          </div>
        </div>
      </div>
    )
  }

  if (slide.kind === 'connector-map' && slide.diagram) {
    return (
      <div className="lesson-three-layout connector-map-layout">
        <SlideHeading slide={slide} />
        <div className="connector-map" aria-label="Agente conectado a Gmail mediante MCP">
          {slide.diagram.map((item, index) => (
            <div className="connector-map-group" key={item}>
              {index > 0 && <span className="connector-arrow" aria-hidden="true">↔</span>}
              <article className={`connector-node is-${index}`}>
                <ConceptIcon name={index === 0 ? 'agent' : index === 1 ? 'plug' : 'mail'} />
                <strong>{item}</strong>
              </article>
            </div>
          ))}
        </div>
        {slide.highlight && <div className="lesson-three-key-message">{slide.highlight}</div>}
      </div>
    )
  }

  if (slide.kind === 'connector-chat' && slide.chat) {
    return <ConnectorChat slide={slide} />
  }

  if (slide.kind === 'tool-grid' && slide.cards) {
    return (
      <div className="lesson-three-layout tool-grid-layout">
        <SlideHeading slide={slide} />
        <div className="tool-card-grid">
          {slide.cards.map((card, index) => (
            <article className="tool-card" key={card.title} style={{ animationDelay: `${index * 70}ms` }}>
              <span><ConceptIcon name={card.icon} /></span>
              <div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </article>
          ))}
        </div>
        {slide.highlight && <div className="lesson-three-key-message">{slide.highlight}</div>}
      </div>
    )
  }

  if (slide.kind === 'skill-process' && slide.steps) {
    return (
      <div className="lesson-three-layout skill-process-layout">
        <SlideHeading slide={slide} />
        <div className="skill-process-body">
          <div className="skill-document">
            <span><ConceptIcon name="skill" /></span>
            <small>Skill</small>
            <strong>Organizar la bandeja de entrada</strong>
          </div>
          <ol className="skill-steps">
            {slide.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        {slide.highlight && <div className="lesson-three-key-message">{slide.highlight}</div>}
      </div>
    )
  }

  if (slide.kind === 'plugin-bundle' && slide.cards) {
    return (
      <div className="lesson-three-layout plugin-bundle-layout">
        <SlideHeading slide={slide} />
        <div className="plugin-equation" aria-label="MCP más Skill es igual a Plugin">
          {slide.cards.map((card, index) => (
            <div className="plugin-equation-group" key={card.title}>
              {index > 0 && <span className="plugin-equation-operator" aria-hidden="true">{index === 2 ? '=' : '+'}</span>}
              <article className={`plugin-equation-card ${index === 2 ? 'is-result' : ''}`}>
                <span><ConceptIcon name={card.icon} /></span>
                <h3>{card.title}</h3>
              </article>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (slide.kind === 'machine-overview' && slide.cards) {
    return (
      <div className="lesson-three-layout machine-overview-layout">
        <SlideHeading slide={slide} />
        <div className="machine-equation">
          {slide.cards.map((card, index) => (
            <div className="machine-equation-group" key={card.title}>
              {index > 0 && <span className="machine-plus" aria-hidden="true">+</span>}
              <article className={`machine-part is-${index}`}>
                <span><ConceptIcon name={card.icon} /></span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            </div>
          ))}
        </div>
        <div className="machine-result" aria-hidden="true">
          <span>Idea</span><i>→</i><span>Producción</span><i>→</i><span>Aprobación</span><i>→</i><span>Publicación</span>
        </div>
        {slide.highlight && <div className="lesson-three-key-message">{slide.highlight}</div>}
      </div>
    )
  }

  if (slide.kind === 'machine-roadmap' && slide.steps) {
    return (
      <div className="lesson-three-layout machine-roadmap-layout">
        <SlideHeading slide={slide} />
        <ol className="machine-roadmap">
          {slide.steps.map((step, index) => (
            <li key={step.title} tabIndex={0}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  if (slide.kind === 'prompt-library' && slide.cards) {
    return (
      <div className="lesson-three-layout prompt-library-layout">
        <SlideHeading slide={slide} />
        <PromptLibrary slide={slide} />
      </div>
    )
  }

  return (
    <div className={`slide-content ${slide.kind === 'practice' ? 'practice-slide' : ''} ${slide.density === 'compact' ? 'is-compact' : ''}`}>
      <SlideHeading slide={slide} />
      {slide.bullets && (
        <ul className="bullet-list large-list">
          {slide.bullets.map((bullet, index) => (
            <li key={bullet} style={{ animationDelay: `${index * 95}ms` }}>{bullet}</li>
          ))}
        </ul>
      )}
      {slide.highlight && <div className="highlight-box">{slide.highlight}</div>}
      {slide.copyLink && <CopyLinkButton action={slide.copyLink} />}
      {slide.copyText && <CopyTextButton action={slide.copyText} />}
      {slide.externalLink && <ExternalLinkButton action={slide.externalLink} />}
    </div>
  )
}

export function LessonDeck({ lessonNumber, slides, courseTitle = 'IA aplicada al marketing' }: LessonDeckProps) {
  const slideIds = useMemo(() => slides.map((slide) => slide.id), [slides])
  const stageRef = useRef<HTMLElement>(null)
  const { index, next, previous } = useSlideNavigation({
    lessonNumber,
    slideIds,
    navigationRef: stageRef,
  })
  const toggleFullscreen = useFullscreen()
  const slide = slides[index]
  const progress = ((index + 1) / slides.length) * 100

  useEffect(() => {
    if (window.innerWidth <= 980) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    } else {
      stageRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    }
    document.title = `${slide.title} · ${courseTitle}`
  }, [courseTitle, slide.title])

  useEffect(() => () => {
    document.title = courseTitle
  }, [courseTitle])

  return (
    <main className="deck-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="deck-stage" aria-live="polite" ref={stageRef}>
        <div className="slide-frame" key={slide.id}><SlideContent slide={slide} /></div>
      </section>

      <footer className="deck-controls">
        <div className="progress-track" aria-hidden="true">
          <div className="progress-value" style={{ width: `${progress}%` }} />
        </div>

        <div className="control-row">
          <div className="slide-meta">
            <span>{slide.time}</span>
            <strong>{String(index + 1).padStart(2, '0')} / {slides.length}</strong>
          </div>

          <div className="navigation-controls">
            <button type="button" aria-label="Diapositiva anterior" disabled={index === 0} onClick={previous}>
              <ArrowIcon direction="left" />
            </button>
            <button type="button" aria-label="Pantalla completa" onClick={() => void toggleFullscreen()}>
              <FullscreenIcon />
            </button>
            <button type="button" aria-label="Próxima diapositiva" disabled={index === slides.length - 1} onClick={next}>
              <ArrowIcon direction="right" />
            </button>
          </div>

          <div className="keyboard-hint">← → para navegar · F pantalla completa</div>
        </div>
      </footer>
    </main>
  )
}
