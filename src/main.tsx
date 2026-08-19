import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CoursePortal } from './CoursePortal'
import './styles.css'
import './pillar-summary.css'
import './typography.css'
import './briefing.css'
import './briefing-slide.css'
import './mobile-layout.css'
import './survey.css'
import './lesson-three.css'

if (window.location.pathname.endsWith('/admin')) {
  window.location.replace(`${window.location.pathname}/`)
}

const root = document.getElementById('root')

if (!root) {
  throw new Error('No se encontró el elemento raíz.')
}

createRoot(root).render(
  <StrictMode>
    <CoursePortal />
  </StrictMode>,
)
