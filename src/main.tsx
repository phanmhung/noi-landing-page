import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PreferencesProvider } from './context/PreferencesContext'
import { App } from './App'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreferencesProvider>
      <App />
    </PreferencesProvider>
  </StrictMode>,
)
