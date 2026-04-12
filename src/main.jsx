import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GalleryPage from './GalleryPage.jsx'

function getRouteFromHash() {
  const h = window.location.hash.replace(/^#/, '')
  if (h === '/gallery' || h === '/gallery/') return 'gallery'
  return 'home'
}

function Root() {
  const [route, setRoute] = useState(() => getRouteFromHash())

  useEffect(() => {
    const onHash = () => setRoute(getRouteFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route === 'gallery') return <GalleryPage />
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
