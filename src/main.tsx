import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'
import { config } from './config'

// Set title and favicon using config
document.title = `${config.personal.nickname} | ${config.personal.name} ${config.personal.surname}`;

// Set the favicon from config
const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
favicon.setAttribute('rel', 'icon');
favicon.setAttribute('href', config.personal.favicon);
if (!document.querySelector('link[rel="icon"]')) {
  document.head.appendChild(favicon);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
