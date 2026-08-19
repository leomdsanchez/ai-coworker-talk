import { useCallback, useEffect } from 'react'
import { isInteractiveTarget } from '../utils/events'

export function useFullscreen() {
  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    await document.documentElement.requestFullscreen?.()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'f') return
      if (event.metaKey || event.ctrlKey || event.altKey || isInteractiveTarget(event.target)) return

      event.preventDefault()
      void toggleFullscreen()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleFullscreen])

  return toggleFullscreen
}
