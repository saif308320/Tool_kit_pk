import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Har route change pe window ko top pe le jata hai.
// App.jsx me <BrowserRouter> ke andar, <Routes> se upar render karo.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}