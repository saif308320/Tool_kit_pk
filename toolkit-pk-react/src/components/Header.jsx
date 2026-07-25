import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Header({ onMenuClick, menuOpen }) {
  const { lang, setLang } = useLanguage()

  return (
    <header>
      <div className="header-inner">
        <Link to="/" className="logo">
          <img src="/image/Toolkit_pk.png" alt="ToolKitPK" className="logo-icon" />
          <span className="logo-text">ToolKitPK</span>
        </Link>
        <nav className="top-nav">
          <Link to="/zakat-calculator">Zakat</Link>
          <Link to="/currency-converter">Currency</Link>
          <Link to="/loan-calculator">Loan</Link>
          <Link to="/salary-tax-calculator">Tax</Link>
          <Link to="/bmi-calculator">BMI</Link>
        </nav>
        <div className="header-actions">
          <div className="lang-toggle lang-toggle-desktop">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>English</button>
            <button className={lang === 'ur' ? 'active' : ''} onClick={() => setLang('ur')}>اردو</button>
          </div>
          <button
            className={'hamburger-btn' + (menuOpen ? ' open' : '')}
            onClick={onMenuClick}
            aria-label="Menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  )
}