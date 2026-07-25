import { useState } from 'react'
import Header from './Header.jsx'
import Drawer from './Drawer.jsx'
import Footer from './Footer.jsx'

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

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
