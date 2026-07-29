import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <div className="aurora-layer-1" aria-hidden="true"></div>
        <div className="aurora-layer-2" aria-hidden="true"></div>
        <div className="grain-layer" aria-hidden="true"></div>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)