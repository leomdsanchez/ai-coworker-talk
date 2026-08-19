import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { surveyConfig } from './data/survey'
import './admin.css'

type SurveyResponse = {
  submittedAt: string
  name: string
  answers: string[]
  score: number
}

type ResponsePayload = {
  ok?: boolean
  responses?: SurveyResponse[]
}

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-UY', { dateStyle: 'short', timeStyle: 'short' }).format(date)
}

export function AdminApp() {
  const [responses, setResponses] = useState<SurveyResponse[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let isCurrent = true

    const loadResponses = async () => {
      try {
        const response = await fetch(surveyConfig.appScriptUrl)
        const result = await response.json() as ResponsePayload
        if (!response.ok || !result.ok || !Array.isArray(result.responses)) throw new Error('No se pudieron cargar las respuestas.')

        if (isCurrent) {
          setResponses(result.responses)
          setStatus('ready')
        }
      } catch {
        if (isCurrent) setStatus('error')
      }
    }

    void loadResponses()
    return () => { isCurrent = false }
  }, [])

  return (
    <main className="admin-shell">
      <section className="admin-card admin-dashboard">
        <header className="admin-heading">
          <div>
            <p className="admin-eyebrow">Panel del profesor</p>
            <h1>Respuestas de la encuesta.</h1>
          </div>
          <a className="admin-link" href={surveyConfig.sheetUrl} rel="noreferrer" target="_blank">
            Abrir planilla <span aria-hidden="true">↗</span>
          </a>
        </header>

        {status === 'loading' && <p className="admin-status">Cargando respuestas…</p>}
        {status === 'error' && <p className="admin-status">No se pudieron cargar las respuestas. Actualizá la página para intentar nuevamente.</p>}
        {status === 'ready' && responses.length === 0 && <p className="admin-status">Todavía no hay respuestas enviadas.</p>}

        {status === 'ready' && responses.length > 0 && (
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Alumno</th>
                  <th>Enviado</th>
                  <th>Puntaje</th>
                  <th>Respuestas</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response, index) => (
                  <tr key={`${response.name}-${response.submittedAt}-${index}`}>
                    <td>{response.name}</td>
                    <td>{formatDate(response.submittedAt)}</td>
                    <td><strong>{response.score} / 20</strong></td>
                    <td>{response.answers.join(' · ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

const root = document.getElementById('root')

if (!root) {
  throw new Error('No se encontró el contenedor de administración.')
}

createRoot(root).render(<AdminApp />)
