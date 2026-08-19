import { FormEvent, useState } from 'react'
import { surveyConfig, surveyQuestions } from '../data/survey'

type SurveyPageProps = {
  onBack: () => void
}

type SurveyStage = 'name' | 'questions' | 'sending' | 'complete' | 'error'

const letters = ['A', 'B', 'C', 'D'] as const

export function SurveyPage({ onBack }: SurveyPageProps) {
  const [stage, setStage] = useState<SurveyStage>('name')
  const [name, setName] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  const currentQuestion = surveyQuestions[questionIndex]
  const selectedAnswer = answers[questionIndex]
  const isLastQuestion = questionIndex === surveyQuestions.length - 1

  const startSurvey = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name.trim()) setStage('questions')
  }

  const chooseAnswer = (answer: string) => {
    setAnswers((currentAnswers) => {
      const nextAnswers = [...currentAnswers]
      nextAnswers[questionIndex] = answer
      return nextAnswers
    })
  }

  const sendResponses = async () => {
    setStage('sending')

    try {
      const response = await fetch(surveyConfig.appScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ name: name.trim(), answers }),
      })
      const result = await response.json() as { ok?: boolean }

      if (!result.ok) throw new Error('La respuesta no pudo registrarse.')
      setStage('complete')
    } catch {
      setStage('error')
    }
  }

  const advance = () => {
    if (!selectedAnswer) return
    if (isLastQuestion) {
      void sendResponses()
      return
    }
    setQuestionIndex((index) => index + 1)
  }

  return (
    <main className="survey-shell">
      <button className="survey-back" type="button" onClick={onBack}>
        <span aria-hidden="true">←</span> Inicio
      </button>

      <section className="survey-card" aria-live="polite">
        {stage === 'name' && (
          <form className="survey-name-form" onSubmit={startSurvey}>
            <p className="survey-eyebrow">Encuesta final · Clases 1–3</p>
            <h1>Antes de salir, dejá tus respuestas.</h1>
            <p>Son {surveyQuestions.length} preguntas simples sobre lo que trabajamos. Tus respuestas quedan registradas al finalizar.</p>
            <label htmlFor="survey-name">Nombre y apellido</label>
            <input
              autoComplete="name"
              id="survey-name"
              onChange={(event) => setName(event.target.value)}
              placeholder="Escribí tu nombre"
              required
              value={name}
            />
            <button type="submit">Comenzar <span aria-hidden="true">→</span></button>
          </form>
        )}

        {stage === 'questions' && currentQuestion && (
          <div className="survey-question">
            <div className="survey-progress" aria-label={`Pregunta ${questionIndex + 1} de ${surveyQuestions.length}`}>
              <span>Pregunta {questionIndex + 1} de {surveyQuestions.length}</span>
              <div aria-hidden="true"><i style={{ width: `${((questionIndex + 1) / surveyQuestions.length) * 100}%` }} /></div>
            </div>
            <h1>{currentQuestion.question}</h1>
            <div className="survey-options" role="radiogroup" aria-label="Alternativas">
              {currentQuestion.options.map((option, index) => {
                const letter = letters[index]
                const isSelected = selectedAnswer === letter
                return (
                  <button
                    aria-checked={isSelected}
                    className={isSelected ? 'is-selected' : ''}
                    key={option}
                    onClick={() => chooseAnswer(letter)}
                    role="radio"
                    type="button"
                  >
                    <strong>{letter}</strong><span>{option}</span>
                  </button>
                )
              })}
            </div>
            <div className="survey-actions">
              <button disabled={questionIndex === 0} onClick={() => setQuestionIndex((index) => index - 1)} type="button">Anterior</button>
              <button disabled={!selectedAnswer} onClick={advance} type="button">
                {isLastQuestion ? 'Finalizar' : 'Siguiente'} <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        )}

        {stage === 'sending' && (
          <div className="survey-feedback">
            <p className="survey-eyebrow">Guardando</p>
            <h1>Registrando tus respuestas.</h1>
            <p>Esperá un momento.</p>
          </div>
        )}

        {stage === 'complete' && (
          <div className="survey-feedback">
            <p className="survey-eyebrow">Listo</p>
            <h1>Respuestas enviadas.</h1>
            <p>Gracias, {name.trim()}. Ya podés cerrar esta página.</p>
            <button onClick={onBack} type="button">Volver al inicio</button>
          </div>
        )}

        {stage === 'error' && (
          <div className="survey-feedback">
            <p className="survey-eyebrow">No se pudo enviar</p>
            <h1>Intentemos de nuevo.</h1>
            <p>Revisá tu conexión y volvé a enviar las respuestas.</p>
            <button onClick={() => void sendResponses()} type="button">Reintentar</button>
          </div>
        )}
      </section>
    </main>
  )
}
