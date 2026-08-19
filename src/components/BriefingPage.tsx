import { useEffect, useState } from 'react'
import { COURSE_TITLE } from '../data/course'
import { copyText } from '../utils/clipboard'

const STORAGE_KEY = 'curso-criativos-ia:briefing:v1'

const ANALYSIS_PROMPT = `Evaluá el siguiente contenido únicamente como un briefing mínimo para comenzar un trabajo de marketing.

Respondé de forma breve y directa con esta estructura:

1. Nota general del briefing, de 1 a 10.
2. Justificación breve de la nota, en un máximo de tres frases.
3. Qué información está clara y sirve para trabajar.
4. Qué información está débil, incompleta o necesita más precisión.
5. Hasta cinco sugerencias concretas para mejorar el briefing.

No hagas una lista de preguntas. No investigues el mercado. No desarrolles una estrategia completa. No reescribas el briefing. Limitate a evaluarlo y sugerir mejoras.`

type BriefingData = {
  business: string
  location: string
  audience: string
  products: string
  differential: string
}

type Toast = {
  message: string
  tone: 'success' | 'error'
}

const EMPTY_BRIEFING: BriefingData = {
  business: '',
  location: '',
  audience: '',
  products: '',
  differential: '',
}

const fields: Array<{ key: keyof BriefingData; label: string; placeholder: string }> = [
  {
    key: 'business',
    label: 'Datos del negocio',
    placeholder: 'Nombre, rubro, qué hace y en qué etapa se encuentra el negocio.',
  },
  {
    key: 'location',
    label: 'Localización',
    placeholder: 'Ciudad, barrio y zona donde vende o presta el servicio.',
  },
  {
    key: 'audience',
    label: 'Público objetivo',
    placeholder: 'Quién compra, qué necesita y qué problema busca resolver.',
  },
  {
    key: 'products',
    label: 'Productos y servicios',
    placeholder: 'Principales productos o servicios y cuáles quiere priorizar.',
  },
  {
    key: 'differential',
    label: 'Diferencial',
    placeholder: 'Por qué elegir este negocio y qué evidencia sostiene esa diferencia.',
  },
]

function readStoredBriefing(): BriefingData {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return EMPTY_BRIEFING

    const parsed = JSON.parse(stored) as Partial<BriefingData>
    return {
      business: typeof parsed.business === 'string' ? parsed.business : '',
      location: typeof parsed.location === 'string' ? parsed.location : '',
      audience: typeof parsed.audience === 'string' ? parsed.audience : '',
      products: typeof parsed.products === 'string' ? parsed.products : '',
      differential: typeof parsed.differential === 'string' ? parsed.differential : '',
    }
  } catch {
    return EMPTY_BRIEFING
  }
}

function formatBriefing(data: BriefingData) {
  const briefing = [
    'BRIEFING',
    '',
    `Datos del negocio:\n${data.business.trim()}`,
    '',
    `Localización:\n${data.location.trim()}`,
    '',
    `Público objetivo:\n${data.audience.trim()}`,
    '',
    `Productos y servicios:\n${data.products.trim()}`,
    '',
    `Diferencial:\n${data.differential.trim()}`,
  ].join('\n')

  return `${ANALYSIS_PROMPT}\n\n---\n\n${briefing}`
}

type BriefingPageProps = {
  onBack: () => void
}

export function BriefingPage({ onBack }: BriefingPageProps) {
  const [briefing, setBriefing] = useState<BriefingData>(readStoredBriefing)
  const [message, setMessage] = useState('Se guarda automáticamente en este dispositivo.')
  const [toast, setToast] = useState<Toast | null>(null)

  useEffect(() => {
    document.title = `Briefing · ${COURSE_TITLE}`
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(briefing))
      setMessage('Guardado automáticamente en este dispositivo.')
    } catch {
      setMessage('No fue posible guardar en este navegador.')
    }
  }, [briefing])

  useEffect(() => {
    if (!toast) return

    const timer = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const handleCopy = async () => {
    const hasContent = Object.values(briefing).some((value) => value.trim().length > 0)

    if (!hasContent) {
      setToast({ message: 'Completá al menos un campo antes de copiar.', tone: 'error' })
      return
    }

    try {
      await copyText(formatBriefing(briefing))
      setToast({ message: 'Briefing copiado para evaluar en ChatGPT.', tone: 'success' })
    } catch {
      setToast({ message: 'No fue posible copiar el briefing.', tone: 'error' })
    }
  }

  const handleClear = () => {
    if (!window.confirm('¿Querés borrar todo el briefing guardado en este dispositivo?')) return
    setBriefing(EMPTY_BRIEFING)
    setMessage('Briefing eliminado.')
  }

  return (
    <main className="briefing-shell">
      <button className="briefing-back" type="button" onClick={onBack}>
        <span aria-hidden="true">←</span>
        Inicio
      </button>

      <section className="briefing-page">
        <header className="briefing-header">
          <div className="portal-mark">IA</div>
          <p className="portal-eyebrow">Práctica de la clase</p>
          <h1>Briefing del negocio</h1>
          <p>Completá los cinco campos. La información queda guardada solamente en este celular y navegador.</p>
        </header>

        <div className="briefing-fields">
          {fields.map((field) => (
            <label className="briefing-field" key={field.key}>
              <span>{field.label}</span>
              <textarea
                value={briefing[field.key]}
                placeholder={field.placeholder}
                onChange={(event) => setBriefing((current) => ({
                  ...current,
                  [field.key]: event.target.value,
                }))}
              />
            </label>
          ))}
        </div>

        <footer className="briefing-actions">
          <p aria-live="polite">{message}</p>
          <div>
            <button className="briefing-secondary" type="button" onClick={handleClear}>Limpiar</button>
            <button className="briefing-primary" type="button" onClick={() => void handleCopy()}>Copiar para ChatGPT</button>
          </div>
        </footer>
      </section>

      {toast && (
        <div className={`briefing-toast is-${toast.tone}`} role="status" aria-live="polite">
          <span aria-hidden="true">{toast.tone === 'success' ? '✓' : '!'}</span>
          {toast.message}
        </div>
      )}
    </main>
  )
}
