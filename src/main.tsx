import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import TeamPage from './pages/TeamPage'
import AboutPage from './pages/AboutPage'
import ATTLTamperProof from './pages/ATTLTamperProof'
import ATTLLanding from './pages/ATTLLanding'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/teams" element={<TeamPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/attl" element={<ATTLLanding />} />
          <Route path="/attl/tamper-proof" element={<ATTLTamperProof />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
