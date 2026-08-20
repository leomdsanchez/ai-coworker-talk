const deck = document.querySelector('.deck')
const slides = [...document.querySelectorAll('.slide')]
const dots = [...document.querySelectorAll('.progress-dot')]
const count = document.querySelector('.slide-count strong')
const previousButton = document.querySelector('[data-direction="previous"]')
const nextButton = document.querySelector('[data-direction="next"]')

let activeIndex = 0
let touchStart = null

function clamp(index) {
  return Math.max(0, Math.min(index, slides.length - 1))
}

function syncNavigation(index) {
  activeIndex = clamp(index)
  count.textContent = String(activeIndex + 1).padStart(2, '0')
  previousButton.disabled = activeIndex === 0
  nextButton.disabled = activeIndex === slides.length - 1

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
  slides[clamp(index)].scrollIntoView({ behavior: 'smooth', block: 'start' })
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

previousButton.addEventListener('click', () => goTo(activeIndex - 1))
nextButton.addEventListener('click', () => goTo(activeIndex + 1))

window.addEventListener('keydown', (event) => {
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
    goTo(slides.length - 1)
  }
})

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
    goTo(activeIndex + (deltaX < 0 ? 1 : -1))
  }
}, { passive: true })

syncNavigation(0)
