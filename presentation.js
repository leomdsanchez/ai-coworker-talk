const deck = document.querySelector('.deck')
const slides = [...document.querySelectorAll('.slide:not([hidden])')]
const dots = [...document.querySelectorAll('.progress-dot')]
const count = document.querySelector('.slide-count strong')
const previousButton = document.querySelector('[data-direction="previous"]')
const nextButton = document.querySelector('[data-direction="next"]')
const newsSlide = document.querySelector('.slide--news:not([hidden])')
const newsClips = [...newsSlide.querySelectorAll('[data-news-step]')]
const newsProgress = newsSlide.querySelector('.news-progress')
const newsSlideIndex = slides.indexOf(newsSlide)

let activeIndex = 0
let visibleNews = 1
let touchStart = null
let wheelLocked = false

function clamp(index) {
  return Math.max(0, Math.min(index, slides.length - 1))
}

function isNewsActive() {
  return activeIndex === newsSlideIndex
}

function syncNews(nextVisible) {
  visibleNews = Math.max(1, Math.min(nextVisible, newsClips.length))

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

  const atNewsEnd = isNewsActive() && visibleNews === newsClips.length
  previousButton.disabled = activeIndex === 0
  nextButton.disabled = activeIndex === slides.length - 1 && atNewsEnd

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

function goTo(index) {
  const nextIndex = clamp(index)
  slides[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' })

  if (nextIndex === newsSlideIndex && activeIndex !== newsSlideIndex) {
    syncNews(1)
  }
}

function advance() {
  if (isNewsActive() && visibleNews < newsClips.length) {
    syncNews(visibleNews + 1)
    syncNavigation(activeIndex)
    return
  }

  goTo(activeIndex + 1)
}

function retreat() {
  if (isNewsActive() && visibleNews > 1) {
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

    if (visible) syncNavigation(Number(visible.target.dataset.slideIndex))
  },
  { root: deck, threshold: [0.45, 0.65, 0.85] },
)

slides.forEach((slide) => observer.observe(slide))

dots.forEach((dot) => {
  dot.addEventListener('click', () => goTo(Number(dot.dataset.slideTarget)))
})

previousButton.addEventListener('click', retreat)
nextButton.addEventListener('click', advance)

window.addEventListener('keydown', (event) => {
  const forward = ['ArrowDown', 'ArrowRight', 'PageDown', ' ', 'Enter'].includes(event.key)
  const backward = ['ArrowUp', 'ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)

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

syncNews(1)
syncNavigation(0)
