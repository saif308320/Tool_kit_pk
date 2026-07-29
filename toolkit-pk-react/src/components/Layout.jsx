import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Drawer from './Drawer.jsx'
import Footer from './Footer.jsx'
import { recordToolVisit } from '../hooks/useToolHistory.js'

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Records a visit every time the route changes — this is the ONLY
  // place tracking happens, so no individual tool page needs editing.
  useEffect(() => {
    recordToolVisit(location.pathname)
  }, [location.pathname])

  const openMenu = () => {
    setMenuOpen(true)
    document.body.classList.add('drawer-locked')
  }
  const closeMenu = () => {
    setMenuOpen(false)
    document.body.classList.remove('drawer-locked')
  }

  return (
    <>
      <Header onMenuClick={() => (menuOpen ? closeMenu() : openMenu())} menuOpen={menuOpen} />
      <Drawer open={menuOpen} onClose={closeMenu} />
      <main>{children}</main>
      <Footer />
    </>
  )
}