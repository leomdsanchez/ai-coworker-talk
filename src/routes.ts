export type CourseView = 'home' | 'briefing' | 'lesson-1-overview' | 'lesson-1' | 'lesson-2' | 'lesson-3' | 'survey'

export const BRIEFING_HASH = '#briefing'
export const SURVEY_HASH = '#encuesta'
const LEGACY_LESSON_ONE_CONTENT_HASH = '#aula-1-contenido'

export function lessonOverviewHash(lessonNumber: number) {
  return `#aula-${lessonNumber}`
}

export function lessonSlideHash(lessonNumber: number, slideId: string) {
  return `${lessonOverviewHash(lessonNumber)}/${encodeURIComponent(slideId)}`
}

export function getLessonSlideId(lessonNumber: number, hash = window.location.hash) {
  const prefix = `${lessonOverviewHash(lessonNumber)}/`
  if (!hash.startsWith(prefix)) return null

  const encodedSlideId = hash.slice(prefix.length)
  if (!encodedSlideId) return null

  try {
    return decodeURIComponent(encodedSlideId)
  } catch {
    return null
  }
}

export function getCourseView(hash = window.location.hash): CourseView {
  if (hash === BRIEFING_HASH) return 'briefing'
  if (hash === SURVEY_HASH) return 'survey'
  if (hash === LEGACY_LESSON_ONE_CONTENT_HASH || getLessonSlideId(1, hash)) return 'lesson-1'
  if (hash === lessonOverviewHash(2) || getLessonSlideId(2, hash)) return 'lesson-2'
  if (hash === lessonOverviewHash(3) || getLessonSlideId(3, hash)) return 'lesson-3'
  if (hash === lessonOverviewHash(1)) return 'lesson-1-overview'
  return 'home'
}
