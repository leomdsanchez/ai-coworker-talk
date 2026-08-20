import { useCallback, useEffect, useRef, useState } from 'react'

const slideIds = ['slide-1', 'slide-2-1', 'slide-2-2'] as const

export function OpeningPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const deckRef = useRef<HTMLElement | null>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])

  const goTo = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(index, slideIds.length - 1))
    slideRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          const index = Number((visible.target as HTMLElement).dataset.slideIndex)
          setActiveIndex(index)
        }
      },
      { root: deckRef.current, threshold: [0.45, 0.65, 0.85] },
    )

    slideRefs.current.forEach((slide) => slide && observer.observe(slide))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const forward = ['ArrowDown', 'ArrowRight', 'PageDown', ' ', 'Enter'].includes(event.key)
      const backward = ['ArrowUp', 'ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)

      if (forward) {
        event.preventDefault()
        goTo(activeIndex + 1)
      } else if (backward) {
        event.preventDefault()
        goTo(activeIndex - 1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        goTo(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        goTo(slideIds.length - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, goTo])

  return (
    <div className="presentation-shell">
      <header className="deck-header" aria-label="Identificación de la presentación">
        <span className="deck-header__mark" aria-hidden="true" />
        <span>IA aplicada al trabajo</span>
      </header>

      <nav className="progress-rail" aria-label="Navegación de diapositivas">
        {slideIds.map((id, index) => (
          <button
            className={index === activeIndex ? 'progress-dot is-active' : 'progress-dot'}
            key={id}
            type="button"
            aria-label={`Ir a la diapositiva ${index + 1}`}
            aria-current={index === activeIndex ? 'step' : undefined}
            onClick={() => goTo(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </nav>

      <main className="deck" ref={deckRef}>
        <section
          className="slide slide--cover"
          id="slide-1"
          data-slide-index="0"
          ref={(node) => { slideRefs.current[0] = node }}
          aria-label="Diapositiva 1 de 3"
        >
          <div className="slide__inner cover-layout">
            <span className="cover-line" aria-hidden="true" />
            <h1>
              Inteligencia Artificial
              <span>aplicada al trabajo</span>
            </h1>
            <div className="scroll-cue" aria-hidden="true">
              <span>Deslizar</span>
              <i />
            </div>
          </div>
        </section>

        <section
          className="slide slide--statement"
          id="slide-2-1"
          data-slide-index="1"
          ref={(node) => { slideRefs.current[1] = node }}
          aria-label="Diapositiva 2 de 3"
        >
          <div className="slide__inner statement-layout">
            <p className="statement">
              La IA está dejando de ser una herramienta para convertirse en una{' '}
              <em>compañera de trabajo.</em>
            </p>
            <div className="slide-legend">
              <span aria-hidden="true" />
              Cambio de paradigma
            </div>
          </div>
        </section>

        <section
          className="slide slide--statement slide--statement-final"
          id="slide-2-2"
          data-slide-index="2"
          ref={(node) => { slideRefs.current[2] = node }}
          aria-label="Diapositiva 3 de 3"
        >
          <div className="slide__inner statement-layout">
            <p className="statement">
              En los próximos años la IA será quien ejecute{' '}
              <em>gran parte del trabajo.</em>
            </p>
            <div className="slide-legend">
              <span aria-hidden="true" />
              Cambio de paradigma
            </div>
          </div>
        </section>
      </main>

      <footer className="deck-controls" aria-label="Controles de la presentación">
        <span className="slide-count">
          <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
          <i />
          {String(slideIds.length).padStart(2, '0')}
        </span>
        <div className="navigation-buttons">
          <button
            type="button"
            aria-label="Diapositiva anterior"
            disabled={activeIndex === 0}
            onClick={() => goTo(activeIndex - 1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label="Siguiente diapositiva"
            disabled={activeIndex === slideIds.length - 1}
            onClick={() => goTo(activeIndex + 1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
