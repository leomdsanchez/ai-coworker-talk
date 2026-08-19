import { useEffect, useState } from 'react'
import { BriefingPage } from './components/BriefingPage'
import { LessonDeck } from './components/LessonDeck'
import { SurveyPage } from './components/SurveyPage'
import { COURSE_TITLE, courseLessons } from './data/course'
import { lessonOneSlides } from './data/lesson-1'
import { lessonTwoSlides } from './data/lesson-2'
import { lessonThreeSlides } from './data/lesson-3'
import {
  getCourseView,
  lessonOverviewHash,
  lessonSlideHash,
  type CourseView,
} from './routes'
import './portal.css'
import './portal-compact.css'
import './overview.css'

export function CoursePortal() {
  const [view, setView] = useState<CourseView>(getCourseView)

  useEffect(() => {
    const handleRouteChange = () => setView(getCourseView())
    window.addEventListener('hashchange', handleRouteChange)
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('hashchange', handleRouteChange)
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  useEffect(() => {
    if (view === 'home') document.title = COURSE_TITLE
    if (view === 'lesson-1-overview') document.title = `De la atención al briefing · ${COURSE_TITLE}`
    if (view === 'lesson-2') document.title = `Diseño con IA · ${COURSE_TITLE}`
    if (view === 'lesson-3') document.title = `Sistema de automatización · ${COURSE_TITLE}`
  }, [view])

  const openLessonOne = () => {
    window.location.hash = lessonOverviewHash(1).slice(1)
  }

  const startLessonOne = () => {
    window.location.hash = lessonSlideHash(1, lessonOneSlides[0].id).slice(1)
  }

  const startLessonTwo = () => {
    window.location.hash = lessonSlideHash(2, lessonTwoSlides[0].id).slice(1)
  }

  const startLessonThree = () => {
    window.location.hash = lessonSlideHash(3, lessonThreeSlides[0].id).slice(1)
  }

  const goHome = () => {
    window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`)
    setView('home')
  }

  if (view === 'briefing') {
    return <BriefingPage onBack={goHome} />
  }

  if (view === 'survey') {
    return <SurveyPage onBack={goHome} />
  }

  if (view === 'lesson-1-overview') {
    return (
      <main className="overview-shell">
        <div className="overview-ambient overview-ambient-one" />
        <div className="overview-ambient overview-ambient-two" />

        <button className="lesson-home-button" onClick={goHome} type="button">
          <span aria-hidden="true">←</span>
          Inicio
        </button>

        <section className="overview-content">
          <header className="overview-heading">
            <div className="portal-mark">IA</div>
            <p className="portal-eyebrow">Panorama del curso</p>
            <h1>Qué vamos a aprender en este curso.</h1>
            <p className="overview-lead">
              Un proceso sencillo dentro de ChatGPT para desarrollar piezas que generen flujo hacia el negocio.
            </p>
          </header>

          <ul className="overview-list">
            <li>Aprender a elaborar y desarrollar creativos orientados a atraer personas hacia el negocio.</li>
            <li>Montar en ChatGPT un proceso simple, repetible y adaptado a cada marca.</li>
            <li>Trabajar con más cuidado en la etapa inicial para mejorar la calidad de las salidas.</li>
            <li>Terminar con una máquina de contenido que simplifique y acelere el trabajo cotidiano.</li>
          </ul>

          <div className="overview-footer">
            <p>
              Simple no significa automático: la calidad del resultado depende del contexto, el criterio y el cuidado que ponemos al comienzo.
            </p>
            <button onClick={startLessonOne} type="button">
              Comenzar la clase
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </main>
    )
  }

  if (view === 'lesson-1') {
    return (
      <div className="lesson-view">
        <button className="lesson-home-button" onClick={goHome} type="button">
          <span aria-hidden="true">←</span>
          Inicio
        </button>
        <LessonDeck lessonNumber={1} slides={lessonOneSlides} courseTitle={COURSE_TITLE} />
      </div>
    )
  }

  if (view === 'lesson-2') {
    return (
      <div className="lesson-view">
        <button className="lesson-home-button" onClick={goHome} type="button">
          <span aria-hidden="true">←</span>
          Inicio
        </button>
        <LessonDeck lessonNumber={2} slides={lessonTwoSlides} courseTitle={COURSE_TITLE} />
      </div>
    )
  }

  if (view === 'lesson-3') {
    return (
      <div className="lesson-view">
        <button className="lesson-home-button" onClick={goHome} type="button">
          <span aria-hidden="true">←</span>
          Inicio
        </button>
        <LessonDeck lessonNumber={3} slides={lessonThreeSlides} courseTitle={COURSE_TITLE} />
      </div>
    )
  }

  return (
    <main className="portal-shell">
      <div className="portal-ambient portal-ambient-one" />
      <div className="portal-ambient portal-ambient-two" />

      <section className="portal-content">
        <header className="portal-header">
          <div className="portal-mark">IA</div>
          <p className="portal-eyebrow">Material de consulta</p>
          <h1>{COURSE_TITLE}</h1>
        </header>

        <section className="lesson-grid" aria-label="Clases del curso">
          {courseLessons.map((lesson) => {
            const isAvailable = lesson.status === 'available'
            const openLesson = lesson.number === '01'
              ? openLessonOne
              : lesson.number === '02'
                ? startLessonTwo
                : startLessonThree

            return (
              <article className={`lesson-card ${isAvailable ? 'is-available' : 'is-locked'}`} key={lesson.number}>
                <div className="lesson-card-topline">
                  <span className="lesson-number">Aula {lesson.number}</span>
                  <span className={`lesson-status ${isAvailable ? 'is-available' : ''}`}>
                    {isAvailable ? 'Disponible' : 'En breve'}
                  </span>
                </div>

                <div>
                  <h2>{lesson.title}</h2>
                  <p>{lesson.description}</p>
                </div>

                {isAvailable && (
                  <div className="lesson-card-footer">
                    <button onClick={openLesson} type="button">
                      {lesson.number === '03' ? 'Iniciar la clase' : 'Abrir la clase'}
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                )}
              </article>
            )
          })}
        </section>
      </section>
    </main>
  )
}
