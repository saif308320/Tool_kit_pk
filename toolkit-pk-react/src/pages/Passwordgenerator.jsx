import { useState } from 'react'

const SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}?',
}
const AMBIGUOUS = /[il1LoO0]/g

export default function PasswordGenerator() {
  const [length, setLength] = useState(14)
  const [opts, setOpts] = useState({ lower: true, upper: true, numbers: true, symbols: true })
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  function toggle(key) {
    setOpts((o) => ({ ...o, [key]: !o[key] }))
  }

  function generate() {
    let pool = Object.keys(opts).filter((k) => opts[k]).map((k) => SETS[k]).join('')
    if (excludeAmbiguous) pool = pool.replace(AMBIGUOUS, '')
    if (!pool) return
    const arr = new Uint32Array(length)
    crypto.getRandomValues(arr)
    let pass = ''
    for (let i = 0; i < length; i++) pass += pool[arr[i] % pool.length]
    setPassword(pass)
    setCopied(false)
  }

  function copy() {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const poolSize = Object.keys(opts).filter((k) => opts[k]).reduce((sum, k) => sum + SETS[k].length, 0)
  const entropyBits = poolSize > 0 ? Math.round(length * Math.log2(poolSize)) : 0
  const strength = (() => {
    if (entropyBits >= 80) return { en: 'Very Strong', ur: 'بہت مضبوط', pct: 100, cls: '' }
    if (entropyBits >= 60) return { en: 'Strong', ur: 'مضبوط', pct: 80, cls: '' }
    if (entropyBits >= 40) return { en: 'Medium', ur: 'درمیانہ', pct: 55, cls: 'warn' }
    return { en: 'Weak', ur: 'کمزور', pct: 25, cls: 'bad' }
  })()

  return (
    <div className="calc-wrap">
      <div className="calc-header">
        <h1 className="en-only">Password Generator</h1>
        <h1 className="ur-only ur-text">پاسورڈ جنریٹر</h1>
        <p className="calc-intro en-only">Generate strong, random, and secure passwords instantly — 100% in your browser.</p>
        <p className="calc-intro ur-only ur-text">مضبوط اور محفوظ پاسورڈ فوری بنائیں — مکمل طور پر آپ کے براؤزر میں۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label>
            <span className="en-only">Password Length: {length}</span>
            <span className="ur-only ur-text">پاسورڈ کی لمبائی: {length}</span>
          </label>
          <input type="range" min="6" max="32" value={length} onChange={(e) => setLength(Number(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div className="field toggle-list">
          {[
            { key: 'lower', en: 'Lowercase (a-z)', ur: 'چھوٹے حروف (a-z)' },
            { key: 'upper', en: 'Uppercase (A-Z)', ur: 'بڑے حروف (A-Z)' },
            { key: 'numbers', en: 'Numbers (0-9)', ur: 'اعداد (0-9)' },
            { key: 'symbols', en: 'Symbols (!@#$)', ur: 'علامات (!@#$)' },
          ].map((o) => (
            <button type="button" key={o.key} className={'toggle-row' + (opts[o.key] ? ' active' : '')} onClick={() => toggle(o.key)}>
              <span className="toggle-row-label">
                <span className="en-only">{o.en}</span>
                <span className="ur-only ur-text">{o.ur}</span>
              </span>
              <span className="toggle-switch">
                <svg viewBox="0 0 20 20" fill="none"><path d="M4 10.5L8 14.5L16 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </button>
          ))}
          <button type="button" className={'toggle-row' + (excludeAmbiguous ? ' active' : '')} onClick={() => setExcludeAmbiguous((v) => !v)}>
            <span className="toggle-row-label">
              <span className="en-only">Exclude ambiguous characters (l, 1, I, O, 0)</span>
              <span className="ur-only ur-text">مبہم حروف نکال دیں (l, 1, I, O, 0)</span>
            </span>
            <span className="toggle-switch">
              <svg viewBox="0 0 20 20" fill="none"><path d="M4 10.5L8 14.5L16 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </button>
        </div>

        <button className="btn" onClick={generate}>
          <span className="en-only">🔑 Generate Password</span>
          <span className="ur-only ur-text">🔑 پاسورڈ بنائیں</span>
        </button>

        {password && (
          <div className="result-box show">
            <div className="label en-only">Your Password</div>
            <div className="label ur-only ur-text">آپ کا پاسورڈ</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div className="value" style={{ fontSize: 20, wordBreak: 'break-all' }}>{password}</div>
              <button type="button" className="btn copy-btn" onClick={copy}>
                {copied ? '✅ Copied' : '📋 Copy'}
              </button>
            </div>

            <div className="strength-row">
              <div className="progress-track">
                <div className={'progress-fill ' + strength.cls} style={{ width: `${strength.pct}%` }} />
              </div>
              <span className="sub" style={{ fontWeight: 800, whiteSpace: 'nowrap' }}>
                <span className="en-only">{strength.en}</span>
                <span className="ur-only ur-text">{strength.ur}</span>
              </span>
            </div>
            <div className="field-note en-only">Entropy: ~{entropyBits} bits — higher is harder to crack.</div>
            <div className="field-note ur-only ur-text">اینٹروپی: ~{entropyBits} بٹس — جتنا زیادہ، اتنا ہی مشکل توڑنا۔</div>
          </div>
        )}
      </div>

      <article className="article">
        <div className="en-only">
          <h2>What makes a password strong?</h2>
          <p>A strong password is at least 12-14 characters long and mixes uppercase, lowercase, numbers, and symbols, making it much harder to guess or crack through brute force.</p>
          <h2>What is password entropy?</h2>
          <p>Entropy measures how random and unpredictable a password is, in bits. A password with 60+ bits of entropy is considered very difficult to crack with current technology.</p>
          <h2>Is this tool safe to use?</h2>
          <p>Yes — passwords are generated entirely in your browser using a cryptographically secure random generator and are never sent to any server.</p>
        </div>
        <div className="ur-only ur-text">
          <h2>مضبوط پاسورڈ کیا ہوتا ہے؟</h2>
          <p>مضبوط پاسورڈ کم از کم 12-14 حروف کا ہوتا ہے اور بڑے، چھوٹے حروف، اعداد اور علامات کا مجموعہ ہوتا ہے۔</p>
          <h2>کیا یہ ٹول محفوظ ہے؟</h2>
          <p>جی ہاں — پاسورڈ آپ کے براؤزر میں ہی محفوظ طریقے سے بنایا جاتا ہے اور کبھی سرور پر نہیں بھیجا جاتا۔</p>
        </div>
      </article>
    </div>
  )
}