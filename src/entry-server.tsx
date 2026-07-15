import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider, HelmetServerState } from 'react-helmet-async'
import { Routes, Route } from 'react-router-dom'
import App from './App'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import TeamPage from './pages/TeamPage'
import AboutPage from './pages/AboutPage'
import ATTLTamperProof from './pages/ATTLTamperProof'
import './index.css'

export function render(url: string): { html: string; helmet: HelmetServerState } {
  const helmetContext: { helmet?: HelmetServerState } = {}

  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/teams" element={<TeamPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/attl/tamper-proof" element={<ATTLTamperProof />} />
        </Routes>
      </StaticRouter>
    </HelmetProvider>,
  )

  return { html, helmet: helmetContext.helmet! }
}
