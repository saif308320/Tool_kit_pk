import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext.jsx'
import Layout from './components/Layout.jsx'

import Home from './pages/Home.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Zakat from './pages/Zakat.jsx'
import Currency from './pages/Currency.jsx'
import Loan from './pages/Loan.jsx'
import Tax from './pages/Tax.jsx'
import Bmi from './pages/Bmi.jsx'
import Age from './pages/Age.jsx'
import Percentage from './pages/Percentage.jsx'
import UnitConverter from './pages/UnitConverter.jsx'
import Discount from './pages/Discount.jsx'
import Gpa from './pages/Gpa.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'

export default function App() {
  return (
    <LanguageProvider>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/zakat-calculator" element={<Zakat />} />
          <Route path="/currency-converter" element={<Currency />} />
          <Route path="/loan-calculator" element={<Loan />} />
          <Route path="/salary-tax-calculator" element={<Tax />} />
          <Route path="/bmi-calculator" element={<Bmi />} />
          <Route path="/age-calculator" element={<Age />} />
          <Route path="/percentage-calculator" element={<Percentage />} />
          <Route path="/unit-converter" element={<UnitConverter />} />
          <Route path="/discount-calculator" element={<Discount />} />
          <Route path="/gpa-calculator" element={<Gpa />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms-of-service" element={<Terms />} />
        </Routes>
      </Layout>
    </LanguageProvider>
  )
}