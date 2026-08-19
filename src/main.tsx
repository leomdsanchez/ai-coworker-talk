import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OpeningPage } from './OpeningPage'
import './styles.css'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Raiz da aplicação não encontrada.')
}

createRoot(root).render(
  <StrictMode>
    <OpeningPage />
  </StrictMode>,
)
