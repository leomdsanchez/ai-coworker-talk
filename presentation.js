const deck = document.querySelector('.deck')
const applePaperFigure = new URL('./assets/research/apple-illusion-of-thinking-figure.png', import.meta.url).href

const contextPattern = [
  ...Array(8).fill('correct'),
  'error', 'correct', 'correct', 'error',
  ...Array(13).fill('error'),
]

function contextTokenMarkup(state, index) {
  const isError = state === 'error'
  const icon = isError
    ? '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>'
    : '<path d="m20 6-11 11-5-5"></path>'

  return `
    <span class="context-token ${isError ? 'is-error' : 'is-correct'}" aria-label="${isError ? 'Error' : 'Paso correcto'} ${index + 1}">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>
    </span>`
}

function modesMarkup(unlockedCount, heading, emphasis) {
  const modes = [
    ['Conversacional', 'Preguntar y responder'],
    ['Delegada', 'Entregar una tarea'],
    ['Agéntica', 'Perseguir un objetivo'],
    ['Integrada', 'Operar de forma recurrente'],
  ]

  return `
    <div class="slide__inner modes-layout">
      <div class="modes-heading">
        <p>Los modos de utilizar IA</p>
        <h2>${heading} <em>${emphasis}</em></h2>
      </div>
      <ol class="modes-track" aria-label="Evolución de los modos de utilizar inteligencia artificial">
        ${modes.map(([name, description], index) => {
          const step = index + 1
          const state = step === unlockedCount ? 'is-unlocked' : step < unlockedCount ? 'is-complete' : 'is-locked'
          const content = step <= unlockedCount
            ? `<strong>${name}</strong><small>${description}</small>`
            : '<strong>Por revelar</strong>'
          const aria = step > unlockedCount ? ` aria-label="Etapa ${step} aún no revelada"` : ''
          return `<li class="mode-step ${state}"${aria}><span>0${step}</span>${content}</li>`
        }).join('')}
      </ol>
    </div>`
}

const remainingSlides = [
  {
    id: 'slide-13',
    className: 'slide--story-dark',
    label: 'Actuar no era lo mismo que terminar',
    html: `
      <div class="slide__inner story-layout">
        <p class="section-kicker">El problema: consistencia</p>
        <h2 class="story-title">Tener herramientas no garantizaba <em>terminar el trabajo.</em></h2>
        <p class="story-note">Actuar una vez era posible. Mantener una cadena larga y coherente seguía siendo difícil.</p>
      </div>`,
  },
  {
    id: 'slide-14',
    className: 'slide--light-extension',
    theme: 'light',
    label: 'Apple pone a prueba los modelos de razonamiento',
    html: `
      <div class="slide__inner evidence-layout">
        <div class="evidence-copy">
          <p class="section-kicker">Apple pone sobre la mesa un límite incómodo</p>
          <h2>Razonar más no evita el <em>colapso.</em></h2>
          <p>En <cite>The Illusion of Thinking</cite>, Apple aumenta de forma controlada la complejidad de los problemas y observa un límite claro.</p>
        </div>
        <figure class="paper-evidence" aria-label="Paper The Illusion of Thinking de Apple Machine Learning Research">
          <header>
            <span>Apple Machine Learning Research</span>
            <small>NeurIPS · 2025</small>
          </header>
          <h3><cite>The Illusion of Thinking</cite></h3>
          <img src="${applePaperFigure}" alt="Figura del estudio que compara precisión, longitud de respuesta y razonamiento a medida que aumenta la complejidad" />
          <figcaption>
            <span>Hallazgo principal</span>
            <strong>A partir de cierto nivel de complejidad, la precisión colapsa.</strong>
            <a href="https://machinelearning.apple.com/research/illusion-of-thinking" target="_blank" rel="noreferrer">Fuente: Apple · junio de 2025 ↗</a>
          </figcaption>
        </figure>
      </div>`,
  },
  {
    id: 'slide-15',
    className: 'slide--light-extension',
    theme: 'light',
    label: 'La ventana de contexto se condiciona al error',
    html: `
      <div class="slide__inner process-layout">
        <div class="process-heading">
          <p class="section-kicker">El problema multi-step</p>
          <h2>Cada paso depende de <em>los anteriores.</em></h2>
        </div>
        <div class="context-demo" data-context-demo>
          <header class="context-demo__header">
            <div>
              <span>Ventana de contexto</span>
              <small><output data-context-time>00</output> / 40 s</small>
            </div>
            <div class="context-controls" aria-label="Controles de la animación">
              <button type="button" data-context-toggle data-context-control aria-label="Pausar animación">
                <svg class="context-control__pause" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="4" height="16" x="6" y="4" rx="1"></rect><rect width="4" height="16" x="14" y="4" rx="1"></rect></svg>
                <svg class="context-control__play" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m6 3 14 9-14 9z"></path></svg>
              </button>
              <button type="button" data-context-restart data-context-control aria-label="Reiniciar animación">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"></path><path d="M3 3v5h5"></path></svg>
              </button>
            </div>
          </header>
          <div class="context-window" data-context-window>
            <div class="context-belt" data-context-belt>
              ${contextPattern.map(contextTokenMarkup).join('')}
            </div>
          </div>
          <div class="context-demo__footer">
            <span>Contexto limpio</span>
            <i><b data-context-progress></b></i>
            <span>Errores acumulados</span>
          </div>
        </div>
        <p class="process-note">Un error temprano condiciona los pasos siguientes.</p>
      </div>`,
  },
  {
    id: 'slide-16',
    className: 'slide--violet-extension',
    label: 'Una tarea simple también puede ser difícil',
    html: `
      <div class="slide__inner simple-task-layout">
        <p class="section-kicker">La dificultad no siempre está en cada paso</p>
        <h2>Una tarea puede ser <em>simple</em> y aun así ser difícil de sostener.</h2>
        <div class="simple-task-axis" aria-hidden="true"><span>Pasos simples</span><i></i><span>Cadena larga</span></div>
      </div>`,
  },
  {
    id: 'slide-18',
    className: 'slide--light-extension',
    theme: 'light',
    label: 'Entra el harness',
    html: `
      <div class="slide__inner harness-layout">
        <div class="harness-copy">
          <p class="section-kicker">Una estructura alrededor del modelo</p>
          <h2>Entra el <em>harness.</em></h2>
          <p>El sistema conserva el contexto, planifica, actúa, observa, ajusta y entrega.</p>
        </div>
        <ol class="harness-loop" aria-label="Flujo del harness desde el contexto hasta la entrega">
          <li><span>01</span><strong>Contexto</strong></li>
          <li><span>02</span><strong>Plan</strong></li>
          <li><span>03</span><strong>Acción</strong></li>
          <li><span>04</span><strong>Observación</strong></li>
          <li><span>05</span><strong>Ajuste</strong></li>
          <li><span>06</span><strong>Entrega</strong></li>
        </ol>
      </div>`,
  },
  {
    id: 'slide-19',
    className: 'slide--metric slide--light-extension',
    theme: 'light',
    label: 'El horizonte de trabajo aumentó',
    html: `
      <div class="slide__inner metric-layout">
        <div class="metric-copy">
          <p class="section-kicker">La capacidad de mantenerse trabajando aumentó</p>
          <h2>El horizonte de trabajo empezó a <em>crecer.</em></h2>
        </div>
        <div class="metric-placeholder" role="img" aria-label="Placeholder para gráfico METR en escala logarítmica">
          <span>Gráfico 01 · escala logarítmica</span>
          <strong>METR</strong>
          <div class="placeholder-chart placeholder-chart--log" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
          <small>Dataset y metodología por incorporar</small>
        </div>
      </div>`,
  },
  {
    id: 'slide-21',
    className: 'slide--metric slide--light-extension',
    theme: 'light',
    label: 'El horizonte de trabajo se duplica cada cuatro meses',
    html: `
      <div class="slide__inner metric-layout metric-layout--comparison">
        <div class="metric-copy">
          <p class="section-kicker">El ritmo de avance</p>
          <h2>El horizonte de trabajo se <em>duplica cada cuatro meses.</em></h2>
        </div>
        <div class="comparison-placeholder" role="img" aria-label="El horizonte de trabajo se duplica cada cuatro meses">
          <div><span>Horizonte de trabajo</span><strong>×2</strong><i></i></div>
          <div><span>Tiempo de duplicación</span><strong>4 meses</strong><i></i></div>
          <small>Tendencia observada por METR</small>
        </div>
      </div>`,
  },
  {
    id: 'slide-22',
    className: 'slide--violet-extension',
    label: 'El siguiente umbral es una jornada completa',
    html: `
      <div class="slide__inner horizon-layout">
        <div class="horizon-value">8<span>h</span></div>
        <div class="horizon-copy">
          <p class="section-kicker">Futuro próximo · proyección</p>
          <h2>El siguiente umbral es una <em>jornada laboral completa.</em></h2>
          <small>Proyección para finales de 2026 · fuente y rango de incertidumbre pendientes</small>
        </div>
      </div>`,
  },
  {
    id: 'slide-23',
    className: 'slide--modes',
    theme: 'light',
    label: 'Tercera forma de utilizar IA, agéntica',
    html: modesMarkup(3, 'Entonces, perseguimos', 'objetivos.'),
  },
  {
    id: 'slide-24',
    className: 'slide--news-return',
    label: 'Volvemos al presente',
    html: `
      <div class="slide__inner news-return-layout">
        <div class="news-return-copy">
          <p class="section-kicker">Volvemos al presente</p>
          <h2>Ahora estas noticias tienen <em>otro significado.</em></h2>
        </div>
        <div class="news-return-clips" aria-label="Noticias presentadas al inicio de la charla">
          <article class="news-clip is-visible">
            <header><strong>REUTERS</strong><time datetime="2026-02-15">15 FEB 2026</time></header>
            <h3>El fundador de OpenClaw se une a OpenAI</h3>
            <footer><span>AGENTE DE CÓDIGO ABIERTO</span><b>01</b></footer>
          </article>
          <article class="news-clip is-visible">
            <header><strong>ANTHROPIC</strong><time datetime="2026-01-30">30 ENE 2026</time></header>
            <h3>El futuro de la IA en el trabajo: presentamos Cowork</h3>
            <footer><span>TRABAJO AGÉNTICO</span><b>03</b></footer>
          </article>
          <article class="news-clip is-visible">
            <header><strong>OPENAI</strong><time datetime="2026-02-02">02 FEB 2026</time></header>
            <h3>Presentamos Codex: un centro de mando para agentes</h3>
            <footer><span>TRABAJO MULTIAGENTE</span><b>06</b></footer>
          </article>
        </div>
      </div>`,
  },
  {
    id: 'slide-25',
    className: 'slide--light-extension',
    theme: 'light',
    label: 'Cuatro piezas para que la IA se convierta en coworker',
    html: `
      <div class="slide__inner harness-layout coworker-layout">
        <div class="harness-copy">
          <p class="section-kicker">Cuatro piezas que considero cruciales</p>
          <h2>Para que la IA se convierta en <em>coworker.</em></h2>
        </div>
        <ol class="harness-loop" aria-label="Piezas cruciales para que la IA se convierta en coworker">
          <li><span>01</span><strong>Conectores</strong></li>
          <li><span>02</span><strong>Skills</strong></li>
          <li><span>03</span><strong>Rutinas</strong></li>
          <li><span>04</span><strong>Hooks</strong></li>
        </ol>
      </div>`,
  },
  {
    id: 'slide-26',
    className: 'slide--light-extension',
    theme: 'light',
    label: 'Antes usábamos IA durante nuestra jornada',
    html: `
      <div class="slide__inner workday-layout">
        <span class="workday-index">Antes</span>
        <h2>Usábamos la IA como una <em>herramienta</em> durante nuestra jornada.</h2>
        <div class="workday-line" aria-hidden="true"><i></i><b></b><i></i><i></i><b></b><i></i></div>
        <p>Intervenciones puntuales dentro del trabajo humano.</p>
      </div>`,
  },
  {
    id: 'slide-27',
    className: 'slide--violet-extension',
    label: 'Ahora la IA puede tener su propia jornada',
    html: `
      <div class="slide__inner workday-layout workday-layout--now">
        <span class="workday-index">Ahora</span>
        <h2>La IA puede tener su propia jornada y colaborar como <em>parte del equipo.</em></h2>
        <div class="workday-line" aria-hidden="true"><b></b><b></b><b></b><b></b><b></b><b></b></div>
        <p>Ya no delegamos solamente tareas. Delegamos objetivos recurrentes.</p>
      </div>`,
  },
  {
    id: 'slide-28',
    className: 'slide--modes',
    theme: 'light',
    label: 'Cuarta forma de utilizar IA, integrada',
    html: modesMarkup(4, 'Finalmente, la IA se', 'integra.'),
  },
  {
    id: 'slide-29',
    className: 'slide--story-dark',
    label: 'Integración en la práctica',
    html: `
      <div class="slide__inner story-layout story-layout--question">
        <p class="section-kicker">Integración en la práctica</p>
        <h2 class="story-title">¿Cómo se ve una IA <em>integrada al trabajo?</em></h2>
        <p class="story-note">Primero, un caso real. Después, la arquitectura que lo hace posible.</p>
      </div>`,
  },
  {
    id: 'slide-34',
    className: 'slide--tech-dark',
    label: 'Herramientas y ambiente',
    html: `
      <div class="slide__inner architecture-layout">
        <div class="architecture-heading"><p class="section-kicker">Herramientas y ambiente</p><h2>Las piezas que convierten un modelo en un <em>sistema de trabajo.</em></h2></div>
        <ol class="architecture-pieces"><li><span>01</span><strong>MCP</strong></li><li><span>02</span><strong>Skills</strong></li><li><span>03</span><strong>Plugins</strong></li><li><span>04</span><strong>Agendamientos</strong></li><li><span>05</span><strong>Hooks</strong></li></ol>
      </div>`,
  },
  {
    id: 'slide-35',
    className: 'slide--tech-dark',
    label: 'MCP conecta al agente con el mundo',
    html: `
      <div class="slide__inner tech-detail-layout">
        <div><p class="section-kicker">Componente 01</p><span class="tech-acronym">MCP</span></div>
        <div class="tech-detail-copy"><h2>Conecta al agente con <em>herramientas y datos.</em></h2><p>Una forma estandarizada de descubrir y utilizar capacidades externas.</p><small>Definición y ejemplo final pendientes de documentación oficial</small></div>
      </div>`,
  },
  {
    id: 'slide-36',
    className: 'slide--light-extension',
    theme: 'light',
    label: 'Skills convierten experiencia en procedimiento',
    html: `
      <div class="slide__inner tech-detail-layout tech-detail-layout--light">
        <div><p class="section-kicker">Componente 02</p><span class="tech-acronym">Skills</span></div>
        <div class="tech-detail-copy"><h2>Convierten experiencia en un <em>procedimiento reutilizable.</em></h2><p>Enseñan al agente cómo ejecutar bien un tipo de trabajo.</p><small>Ejemplo concreto por seleccionar</small></div>
      </div>`,
  },
  {
    id: 'slide-37',
    className: 'slide--tech-dark',
    label: 'Plugins reúnen capacidades',
    html: `
      <div class="slide__inner tech-detail-layout">
        <div><p class="section-kicker">Componente 03</p><span class="tech-acronym">Plugins</span></div>
        <div class="tech-detail-copy"><h2>Reúnen capacidades para un <em>dominio de trabajo.</em></h2><p>Herramientas, skills y aplicaciones distribuidas como un conjunto.</p><small>Ajustar la definición a la plataforma utilizada en la charla</small></div>
      </div>`,
  },
  {
    id: 'slide-39',
    className: 'slide--tech-dark',
    label: 'Esquema funcional completo',
    html: `
      <div class="slide__inner full-system-layout">
        <div class="full-system-heading"><p class="section-kicker">El sistema completo</p><h2>Un objetivo entra. Un resultado <em>verificable</em> sale.</h2></div>
        <ol class="full-system-flow" aria-label="Esquema funcional de un agente integrado"><li><span>01</span><strong>Evento u objetivo</strong></li><li><span>02</span><strong>Agente</strong></li><li><span>03</span><strong>Contexto</strong></li><li><span>04</span><strong>Herramientas</strong></li><li><span>05</span><strong>Verificación</strong></li><li><span>06</span><strong>Resultado</strong></li></ol>
      </div>`,
  },
  {
    id: 'slide-41',
    className: 'slide--closing',
    label: 'El trabajo cambia de forma',
    html: `
      <div class="slide__inner closing-layout">
        <p class="section-kicker">El trabajo cambia de forma</p>
        <h2>La pregunta ya no es solamente qué podemos hacer con IA.</h2>
        <p>Es qué trabajo podemos <em>rediseñar junto a ella.</em></p>
      </div>`,
  },
]

deck.insertAdjacentHTML('beforeend', remainingSlides.map((slide, index) => `
  <section
    class="slide ${slide.className}"
    id="${slide.id}"
    data-slide-index="${index + 15}"
    ${slide.theme ? `data-theme="${slide.theme}"` : ''}
    aria-label="Diapositiva ${index + 16} de ${remainingSlides.length + 15}: ${slide.label}"
  >${slide.html}</section>
`).join(''))

const slides = [...document.querySelectorAll('.slide:not([hidden])')]
const progressRail = document.querySelector('.progress-rail')
progressRail.innerHTML = slides.map((_, index) => `
  <button class="progress-dot${index === 0 ? ' is-active' : ''}" type="button" data-slide-target="${index}" aria-label="Ir a la diapositiva ${index + 1}"${index === 0 ? ' aria-current="step"' : ''}>
    <span>${String(index + 1).padStart(2, '0')}</span>
  </button>
`).join('')

slides.forEach((slide, index) => {
  slide.dataset.slideIndex = String(index)
  const label = slide.getAttribute('aria-label') || `Diapositiva ${index + 1}`
  slide.setAttribute('aria-label', label.replace(/Diapositiva \d+ de \d+/, `Diapositiva ${index + 1} de ${slides.length}`))
})

const dots = [...document.querySelectorAll('.progress-dot')]
const count = document.querySelector('.slide-count strong')
const total = document.querySelector('[data-slide-total]')
total.textContent = String(slides.length).padStart(2, '0')
const previousButton = document.querySelector('[data-direction="previous"]')
const nextButton = document.querySelector('[data-direction="next"]')
const newsSlide = document.querySelector('.slide--news:not([hidden])')
const newsCanvas = newsSlide.querySelector('.news-canvas')
const newsClips = [...newsSlide.querySelectorAll('[data-news-step]')]
const newsProgress = newsSlide.querySelector('.news-progress')
const newsSlideIndex = slides.indexOf(newsSlide)
const contextSlide = document.querySelector('#slide-15')
const contextSlideIndex = slides.indexOf(contextSlide)
const contextDemo = contextSlide.querySelector('[data-context-demo]')
const contextWindow = contextDemo.querySelector('[data-context-window]')
const contextBelt = contextDemo.querySelector('[data-context-belt]')
const contextProgress = contextDemo.querySelector('[data-context-progress]')
const contextTime = contextDemo.querySelector('[data-context-time]')
const contextToggle = contextDemo.querySelector('[data-context-toggle]')
const contextRestart = contextDemo.querySelector('[data-context-restart]')
const contextTokens = [...contextBelt.querySelectorAll('.context-token')]
const contextDuration = 40000

const burstPlacements = [
  [5, 8, 28, -4], [54, 6, 29, 3], [30, 35, 31, -2], [3, 48, 30, 2],
  [62, 42, 28, -3], [18, 18, 34, 4], [48, 55, 33, -1], [8, 64, 29, 3],
  [66, 18, 31, -4], [36, 8, 30, 2], [21, 52, 35, -3], [58, 64, 30, 4],
  [2, 28, 32, -2], [45, 24, 34, 3], [28, 68, 36, -1], [67, 52, 31, 2],
  [14, 6, 38, -4], [40, 42, 38, 1], [4, 58, 40, -2], [52, 12, 40, 3],
  [25, 26, 42, -1], [44, 58, 42, 2],
]

let activeIndex = 0
let visibleNews = 0
let touchStart = null
let wheelLocked = false
let isNewsBursting = false
let burstTimer = null
let burstCleanupTimer = null
let contextAnimations = []
let contextWasActive = false
let contextFrame = null

function stopContextClock() {
  if (contextFrame) window.cancelAnimationFrame(contextFrame)
  contextFrame = null
}

function syncContextClock() {
  stopContextClock()
  const animation = contextAnimations[0]
  const elapsed = Math.min(contextDuration, Math.max(0, Number(animation?.currentTime) || 0))
  contextTime.textContent = String(Math.floor(elapsed / 1000)).padStart(2, '0')

  if (animation?.playState === 'running') {
    contextFrame = window.requestAnimationFrame(syncContextClock)
  }
}

function syncContextControl() {
  const animation = contextAnimations[0]
  const isRunning = animation?.playState === 'running'
  const isFinished = animation?.playState === 'finished'
  contextDemo.classList.toggle('is-paused', !isRunning)
  contextDemo.classList.toggle('is-complete', isFinished)
  contextToggle.setAttribute('aria-label', isFinished ? 'Reproducir animación nuevamente' : isRunning ? 'Pausar animación' : 'Continuar animación')
}

function cancelContextAnimations() {
  stopContextClock()
  contextAnimations.forEach((animation) => animation.cancel())
  contextAnimations = []
}

function restartContextAnimation(shouldPlay = true) {
  cancelContextAnimations()

  const windowStyles = window.getComputedStyle(contextWindow)
  const horizontalPadding = parseFloat(windowStyles.paddingLeft) + parseFloat(windowStyles.paddingRight)
  const visibleWidth = contextWindow.clientWidth - horizontalPadding
  const travel = Math.max(0, contextBelt.scrollWidth - visibleWidth)
  const timing = { duration: contextDuration, easing: 'linear', fill: 'forwards' }
  const beltStyles = window.getComputedStyle(contextBelt)
  const tokenStep = (contextTokens[0]?.offsetWidth || 1) + (parseFloat(beltStyles.columnGap) || 0)
  const visibleTokenCount = Math.max(1, Math.ceil(visibleWidth / tokenStep))
  const enteringTokenCount = Math.max(1, contextTokens.length - visibleTokenCount)

  const beltAnimation = contextBelt.animate(
    [{ transform: 'translate3d(0, 0, 0)' }, { transform: `translate3d(-${travel}px, 0, 0)` }],
    timing,
  )
  const progressAnimation = contextProgress.animate(
    [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
    timing,
  )
  const tokenAnimations = contextTokens.map((token, index) => {
    const delay = index < visibleTokenCount
      ? 180 + (index * 130)
      : 900 + (((index - visibleTokenCount + 1) / (enteringTokenCount + 1)) * (contextDuration - 1900))

    return token.animate(
      [
        { opacity: 0, transform: 'translateY(0.35rem) scale(0.68)' },
        { opacity: 1, transform: 'translateY(-0.12rem) scale(1.06)', offset: 0.62 },
        { opacity: 1, transform: 'translateY(0.04rem) scale(0.98)', offset: 0.82 },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ],
      { duration: 760, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
    )
  })

  contextAnimations = [beltAnimation, progressAnimation, ...tokenAnimations]
  beltAnimation.addEventListener('finish', () => {
    contextTime.textContent = '40'
    syncContextControl()
    stopContextClock()
  }, { once: true })

  if (!shouldPlay) contextAnimations.forEach((animation) => animation.pause())
  syncContextControl()
  syncContextClock()
}

function syncContextPlayback(index) {
  const isActive = index === contextSlideIndex

  if (isActive && !contextWasActive) {
    restartContextAnimation(true)
  } else if (!isActive && contextWasActive) {
    contextAnimations.forEach((animation) => animation.pause())
    syncContextControl()
    syncContextClock()
  }

  contextWasActive = isActive
}

contextToggle.addEventListener('click', (event) => {
  event.stopPropagation()
  const animation = contextAnimations[0]

  if (!animation || animation.playState === 'finished') {
    restartContextAnimation(true)
  } else if (animation.playState === 'running') {
    contextAnimations.forEach((item) => item.pause())
  } else {
    contextAnimations.forEach((item) => item.play())
  }

  syncContextControl()
  syncContextClock()
})

contextRestart.addEventListener('click', (event) => {
  event.stopPropagation()
  restartContextAnimation(true)
})

function clamp(index) {
  return Math.max(0, Math.min(index, slides.length - 1))
}

function isNewsActive() {
  return activeIndex === newsSlideIndex
}

function syncNews(nextVisible) {
  visibleNews = Math.max(0, Math.min(nextVisible, newsClips.length))

  newsClips.forEach((clip, index) => {
    const isVisible = index < visibleNews
    clip.classList.toggle('is-visible', isVisible)
    clip.setAttribute('aria-hidden', String(!isVisible))
  })

  newsProgress.textContent = `${String(visibleNews).padStart(2, '0')} / ${String(newsClips.length).padStart(2, '0')}`
}

function syncNavigation(index) {
  activeIndex = clamp(index)
  count.textContent = String(activeIndex + 1).padStart(2, '0')
  document.body.classList.toggle('is-light-slide', slides[activeIndex].dataset.theme === 'light')

  previousButton.disabled = isNewsBursting || activeIndex === 0
  nextButton.disabled = isNewsBursting || activeIndex === slides.length - 1

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeIndex
    dot.classList.toggle('is-active', isActive)

    if (isActive) {
      dot.setAttribute('aria-current', 'step')
    } else {
      dot.removeAttribute('aria-current')
    }
  })
}

function removeBurstCopies() {
  newsCanvas.querySelectorAll('.news-burst-copy').forEach((copy) => copy.remove())
  newsSlide.classList.remove('is-bursting')
}

function clearBurst() {
  if (burstTimer) window.clearTimeout(burstTimer)
  if (burstCleanupTimer) window.clearTimeout(burstCleanupTimer)
  burstTimer = null
  burstCleanupTimer = null
  isNewsBursting = false
  removeBurstCopies()
}

function addBurstCopy(index) {
  const source = newsClips[index % newsClips.length]
  const [left, top, width, rotation] = burstPlacements[index]
  const copy = source.cloneNode(true)

  copy.className = 'news-clip news-burst-copy'
  copy.removeAttribute('data-news-step')
  copy.setAttribute('aria-hidden', 'true')
  Object.assign(copy.style, {
    left: `${left}%`,
    top: `${top}%`,
    right: 'auto',
    bottom: 'auto',
    width: `${width}%`,
    zIndex: String(30 + index),
    transform: `rotate(${rotation}deg)`,
  })

  newsCanvas.append(copy)
  window.requestAnimationFrame(() => copy.classList.add('is-visible'))
}

function startNewsBurst() {
  if (isNewsBursting) return

  isNewsBursting = true
  newsSlide.classList.add('is-bursting')
  syncNavigation(activeIndex)

  const addNext = (index) => {
    if (index === burstPlacements.length) {
      burstTimer = window.setTimeout(() => {
        isNewsBursting = false
        burstTimer = null
        goTo(newsSlideIndex + 1)
        burstCleanupTimer = window.setTimeout(() => {
          removeBurstCopies()
          burstCleanupTimer = null
        }, 900)
      }, 280)
      return
    }

    addBurstCopy(index)
    const acceleratingDelay = Math.max(32, 360 * (0.82 ** index))
    burstTimer = window.setTimeout(() => addNext(index + 1), acceleratingDelay)
  }

  addNext(0)
}

function goTo(index) {
  const nextIndex = clamp(index)
  const behavior = Math.abs(nextIndex - activeIndex) <= 1 ? 'smooth' : 'instant'

  if (nextIndex === newsSlideIndex && activeIndex !== newsSlideIndex) {
    clearBurst()
    syncNews(0)
  }

  slides[nextIndex].scrollIntoView({ behavior, block: 'start' })
  syncNavigation(nextIndex)
}

function advance() {
  if (isNewsBursting) return

  if (isNewsActive() && visibleNews < newsClips.length) {
    syncNews(visibleNews + 1)
    syncNavigation(activeIndex)
    return
  }

  if (isNewsActive()) {
    startNewsBurst()
    return
  }

  goTo(activeIndex + 1)
}

function retreat() {
  if (isNewsBursting) return

  if (isNewsActive() && visibleNews > 0) {
    syncNews(visibleNews - 1)
    syncNavigation(activeIndex)
    return
  }

  goTo(activeIndex - 1)
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

    if (visible) {
      const visibleIndex = Number(visible.target.dataset.slideIndex)
      syncNavigation(visibleIndex)
      syncContextPlayback(visibleIndex)
    }
  },
  { root: deck, threshold: [0.45, 0.65, 0.85] },
)

slides.forEach((slide) => observer.observe(slide))

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    if (!isNewsBursting) goTo(Number(dot.dataset.slideTarget))
  })
})

previousButton.addEventListener('click', retreat)
nextButton.addEventListener('click', advance)

window.addEventListener('keydown', (event) => {
  if (event.target instanceof Element && event.target.closest('[data-context-control]')) return

  const forward = ['ArrowDown', 'ArrowRight', 'PageDown', ' ', 'Enter'].includes(event.key)
  const backward = ['ArrowUp', 'ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)

  if (isNewsBursting && (forward || backward || event.key === 'Home' || event.key === 'End')) {
    event.preventDefault()
    return
  }

  if (forward) {
    event.preventDefault()
    advance()
  } else if (backward) {
    event.preventDefault()
    retreat()
  } else if (event.key === 'Home') {
    event.preventDefault()
    goTo(0)
  } else if (event.key === 'End') {
    event.preventDefault()
    goTo(slides.length - 1)
  }
})

deck.addEventListener('wheel', (event) => {
  if (!isNewsActive()) return

  event.preventDefault()
  if (wheelLocked || Math.abs(event.deltaY) < 10) return

  wheelLocked = true
  if (event.deltaY > 0) advance()
  else retreat()

  window.setTimeout(() => {
    wheelLocked = false
  }, 520)
}, { passive: false })

deck.addEventListener('touchstart', (event) => {
  if (event.touches.length !== 1) return
  touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY }
}, { passive: true })

deck.addEventListener('touchend', (event) => {
  if (!touchStart || event.changedTouches.length !== 1) return

  const deltaX = event.changedTouches[0].clientX - touchStart.x
  const deltaY = event.changedTouches[0].clientY - touchStart.y
  touchStart = null

  if (Math.abs(deltaX) > 54 && Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX < 0) advance()
    else retreat()
  }
}, { passive: true })

syncNews(0)
syncNavigation(0)
