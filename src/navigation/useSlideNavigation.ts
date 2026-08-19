import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { getLessonSlideId, lessonSlideHash } from '../routes'
import { isInteractiveTarget } from '../utils/events'

const NEXT_KEYS = ['ArrowRight', 'PageDown', ' ', 'Enter']
const PREVIOUS_KEYS = ['ArrowLeft', 'PageUp', 'Backspace']
const WHEEL_THRESHOLD = 48
const WHEEL_IDLE_DELAY = 240
const HORIZONTAL_SWIPE_DISTANCE = 52
const VERTICAL_SWIPE_DISTANCE = 64
const MAX_SWIPE_DURATION = 1000
const SCROLL_EDGE_TOLERANCE = 6
const DESKTOP_BREAKPOINT = 980

type SlideNavigationOptions = {
  lessonNumber: number
  slideIds: readonly string[]
  navigationRef: RefObject<HTMLElement | null>
}

type TouchStart = {
  x: number
  y: number
  startedAt: number
  canScroll: boolean
  atTop: boolean
  atBottom: boolean
}

function clamp(value: number, maximum: number) {
  return Math.min(Math.max(value, 0), maximum)
}

function normalizeWheelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight
  return event.deltaY
}

function getScrollState(element: HTMLElement | null) {
  const scrollElement = window.innerWidth <= DESKTOP_BREAKPOINT
    ? document.scrollingElement
    : element

  if (!scrollElement) return { canScroll: false, atTop: true, atBottom: true }

  const maximum = Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight)
  const canScroll = maximum > SCROLL_EDGE_TOLERANCE

  return {
    canScroll,
    atTop: !canScroll || scrollElement.scrollTop <= SCROLL_EDGE_TOLERANCE,
    atBottom: !canScroll || scrollElement.scrollTop >= maximum - SCROLL_EDGE_TOLERANCE,
  }
}

export function useSlideNavigation({
  lessonNumber,
  slideIds,
  navigationRef,
}: SlideNavigationOptions) {
  const indexFromUrl = useCallback(() => {
    const slideId = getLessonSlideId(lessonNumber)
    const foundIndex = slideId ? slideIds.indexOf(slideId) : -1
    return foundIndex >= 0 ? foundIndex : 0
  }, [lessonNumber, slideIds])

  const [index, setIndex] = useState(indexFromUrl)
  const indexRef = useRef(index)
  const wheelDelta = useRef(0)
  const wheelLocked = useRef(false)
  const touchStart = useRef<TouchStart>({
    x: 0,
    y: 0,
    startedAt: 0,
    canScroll: false,
    atTop: true,
    atBottom: true,
  })

  const setCurrentIndex = useCallback((nextIndex: number) => {
    indexRef.current = nextIndex
    setIndex(nextIndex)
  }, [])

  const goTo = useCallback((requestedIndex: number, replace = false) => {
    const nextIndex = clamp(requestedIndex, slideIds.length - 1)
    const hash = lessonSlideHash(lessonNumber, slideIds[nextIndex])

    setCurrentIndex(nextIndex)

    if (window.location.hash === hash) return

    if (replace) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`)
      return
    }

    window.location.hash = hash.slice(1)
  }, [lessonNumber, setCurrentIndex, slideIds])

  useEffect(() => {
    const slideId = getLessonSlideId(lessonNumber)
    if (!slideId || !slideIds.includes(slideId)) goTo(0, true)

    const handleHashChange = () => setCurrentIndex(indexFromUrl())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [goTo, indexFromUrl, lessonNumber, setCurrentIndex, slideIds])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return
      if (isInteractiveTarget(event.target)) return

      if (NEXT_KEYS.includes(event.key)) {
        event.preventDefault()
        goTo(indexRef.current + 1)
        return
      }

      if (PREVIOUS_KEYS.includes(event.key)) {
        event.preventDefault()
        goTo(indexRef.current - 1)
        return
      }

      if (event.key === 'Home') {
        event.preventDefault()
        goTo(0)
        return
      }

      if (event.key === 'End') {
        event.preventDefault()
        goTo(slideIds.length - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goTo, slideIds.length])

  useEffect(() => {
    const element = navigationRef.current
    if (!element) return

    let resetTimer: number | undefined
    let unlockTimer: number | undefined

    const scheduleUnlock = () => {
      window.clearTimeout(unlockTimer)
      unlockTimer = window.setTimeout(() => {
        wheelLocked.current = false
      }, WHEEL_IDLE_DELAY)
    }

    const handleWheel = (event: WheelEvent) => {
      const isDesktopViewport = window.innerWidth > DESKTOP_BREAKPOINT
      if (!isDesktopViewport || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return

      event.preventDefault()

      if (wheelLocked.current) {
        scheduleUnlock()
        return
      }

      const delta = normalizeWheelDelta(event)
      if (Math.abs(delta) < 1) return

      wheelDelta.current += delta
      window.clearTimeout(resetTimer)
      resetTimer = window.setTimeout(() => {
        wheelDelta.current = 0
      }, WHEEL_IDLE_DELAY)

      if (Math.abs(wheelDelta.current) < WHEEL_THRESHOLD) return

      goTo(indexRef.current + (wheelDelta.current > 0 ? 1 : -1))
      wheelDelta.current = 0
      wheelLocked.current = true
      scheduleUnlock()
    }

    element.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      element.removeEventListener('wheel', handleWheel)
      window.clearTimeout(resetTimer)
      window.clearTimeout(unlockTimer)
      wheelDelta.current = 0
      wheelLocked.current = false
    }
  }, [goTo, navigationRef])

  useEffect(() => {
    const element = navigationRef.current
    if (!element) return

    const resetTouch = () => {
      touchStart.current.startedAt = 0
    }

    const handleTouchStart = (event: TouchEvent) => {
      resetTouch()
      if (isInteractiveTarget(event.target)) return

      const touch = event.changedTouches[0]
      if (!touch) return

      const scrollState = getScrollState(element)
      touchStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        startedAt: Date.now(),
        canScroll: scrollState.canScroll,
        atTop: scrollState.atTop,
        atBottom: scrollState.atBottom,
      }
    }

    const handleTouchEnd = (event: TouchEvent) => {
      const start = { ...touchStart.current }
      if (!start.startedAt) return

      const touch = event.changedTouches[0]
      resetTouch()
      if (!touch) return

      const deltaX = touch.clientX - start.x
      const deltaY = touch.clientY - start.y
      const duration = Date.now() - start.startedAt
      if (duration > MAX_SWIPE_DURATION) return

      const horizontalDistance = Math.abs(deltaX)
      const verticalDistance = Math.abs(deltaY)
      const horizontalGesture = horizontalDistance > verticalDistance * 1.15

      if (horizontalGesture) {
        if (horizontalDistance < HORIZONTAL_SWIPE_DISTANCE) return
        goTo(indexRef.current + (deltaX < 0 ? 1 : -1))
        return
      }

      if (verticalDistance < VERTICAL_SWIPE_DISTANCE) return

      const swipingUp = deltaY < 0
      const canNavigateVertically = !start.canScroll
        || (swipingUp ? start.atBottom : start.atTop)

      if (!canNavigateVertically) return
      goTo(indexRef.current + (swipingUp ? 1 : -1))
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchcancel', resetTouch, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', resetTouch)
    }
  }, [goTo, navigationRef])

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo])
  const previous = useCallback(() => goTo(indexRef.current - 1), [goTo])

  return { index, goTo, next, previous }
}
