const deck = document.querySelector('.deck')
const slides = [...document.querySelectorAll('.slide:not([hidden])')]
const dots = [...document.querySelectorAll('.progress-dot')]
const count = document.querySelector('.slide-count strong')
const previousButton = document.querySelector('[data-direction="previous"]')
const nextButton = document.querySelector('[data-direction="next"]')
const newsSlide = document.querySelector('.slide--news:not([hidden])')
const newsCanvas = newsSlide.querySelector('.news-canvas')
const newsClips = [...newsSlide.querySelectorAll('[data-news-step]')]
const newsProgress = newsSlide.querySelector('.news-progress')
const newsSlideIndex = slides.indexOf(newsSlide)

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

  if (nextIndex === newsSlideIndex && activeIndex !== newsSlideIndex) {
    clearBurst()
    syncNews(0)
  }

  slides[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' })
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

    if (visible) syncNavigation(Number(visible.target.dataset.slideIndex))
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
