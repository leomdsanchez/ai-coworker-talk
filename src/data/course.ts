export type LessonSummary = {
  number: string
  title: string
  description: string
  status: 'available' | 'soon'
}

export const COURSE_TITLE = 'IA aplicada al marketing'

export const courseLessons = [
  {
    number: '01',
    title: 'De la atención al briefing',
    description: 'Atención, anuncios y construcción del briefing.',
    status: 'available',
  },
  {
    number: '02',
    title: 'Copy y diseño con IA',
    description: 'Planificación creativa, referencias y creación de piezas con IA.',
    status: 'available',
  },
  {
    number: '03',
    title: 'Sistema de automatización',
    description: 'Ideas, aprobaciones, tareas recurrentes y archivos organizados en Drive.',
    status: 'available',
  },
] satisfies readonly LessonSummary[]
