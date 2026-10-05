import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { EntitlementsProvider } from './context/EntitlementsContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <EntitlementsProvider>
        <App />
      </EntitlementsProvider>
    </AuthProvider>
  </StrictMode>,
)
