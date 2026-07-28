import { useMemo, useState } from 'react'

const PLATFORMS = [
  { key: 'sms', en: 'SMS', ur: 'ایس ایم ایس', limit: 160 },
  { key: 'x', en: 'X (Twitter)', ur: 'ایکس (ٹوئٹر)', limit: 280 },
  { key: 'ig', en: 'Instagram Caption', ur: 'انسٹاگرام کیپشن', limit: 2200 },
  { key: 'meta', en: 'Meta / SEO Description', ur: 'میٹا ڈسکرپشن', limit: 160 },
]

export default function WordCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const trimmed = text.trim()
    const words = trimmed ? trimmed.split(/\s+/).length : 0
    const chars = text.length
    const charsNoSpace = text.replace(/\s/g, '').length
    const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length || 1 : 0
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter(Boolean).length : 0
    const readingTime = Math.max(1, Math.ceil(words / 200))
    const speakingTime = Math.max(1, Math.ceil(words / 130))
    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime, speakingTime }
  }, [text])

  return (
    <div className="calc-wrap">
      <div className="calc-header">
        <h1 className="en-only">Word & Character Counter</h1>
        <h1 className="ur-only ur-text">لفظ اور حروف شمار کرنے والا</h1>
        <p className="calc-intro en-only">Count words, characters, sentences, and reading time instantly — plus check platform limits.</p>
        <p className="calc-intro ur-only ur-text">الفاظ، حروف، جملے اور پڑھنے کا وقت فوری معلوم کریں۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label><span className="en-only">Paste or type your text</span><span className="ur-only ur-text">اپنی تحریر یہاں لکھیں یا پیسٹ کریں</span></label>
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing..."
            style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: 14.5, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>

        <div className="result-box show">
          <div className="stat-grid">
            {[
              { icon: '📝', en: 'Words', ur: 'الفاظ', val: stats.words },
              { icon: '🔤', en: 'Characters', ur: 'حروف', val: stats.chars },
              { icon: '⌨️', en: 'Chars (no space)', ur: 'حروف (بغیر سپیس)', val: stats.charsNoSpace },
              { icon: '📖', en: 'Sentences', ur: 'جملے', val: stats.sentences },
              { icon: '📄', en: 'Paragraphs', ur: 'پیراگراف', val: stats.paragraphs },
              { icon: '⏱️', en: 'Reading time', ur: 'پڑھنے کا وقت', val: `${stats.readingTime} min` },
              { icon: '🗣️', en: 'Speaking time', ur: 'بولنے کا وقت', val: `${stats.speakingTime} min` },
            ].map((s) => (
              <div key={s.en} className="stat-card">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value" style={{ fontSize: 18 }}>{s.val}</div>
                <div className="stat-label en-only">{s.en}</div>
                <div className="stat-label ur-only ur-text">{s.ur}</div>
              </div>
            ))}
          </div>

          <div className="label en-only" style={{ marginTop: 18 }}>Platform Character Limits</div>
          <div className="label ur-only ur-text" style={{ marginTop: 18 }}>پلیٹ فارم کریکٹر حدیں</div>
          {PLATFORMS.map((p) => {
            const pct = Math.min(100, Math.round((stats.chars / p.limit) * 100))
            const over = stats.chars > p.limit
            return (
              <div key={p.key} style={{ marginTop: 10 }}>
                <div className="progress-row">
                  <span><span className="en-only">{p.en}</span><span className="ur-only ur-text">{p.ur}</span></span>
                  <span>{stats.chars} / {p.limit}</span>
                </div>
                <div className="progress-track">
                  <div className={'progress-fill' + (over ? ' bad' : pct > 85 ? ' warn' : '')} style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <article className="article">
        <div className="en-only">
          <h2>Who uses a word counter?</h2>
          <p>Students, writers, and content creators use word counters to meet essay limits, SEO requirements, or social media character limits like X's 280 characters or Instagram's 2,200-character caption limit.</p>
          <h2>How is reading time calculated?</h2>
          <p>Reading time is estimated using an average adult silent reading speed of about 200 words per minute, while speaking time uses an average spoken pace of about 130 words per minute — useful for scripting videos or speeches.</p>
        </div>
        <div className="ur-only ur-text">
          <h2>ورڈ کاؤنٹر کون استعمال کرتا ہے؟</h2>
          <p>طالب علم، لکھاری اور کانٹینٹ رائٹرز ورڈ کاؤنٹر استعمال کرتے ہیں تاکہ الفاظ کی حد یا کریکٹر لمٹ پوری کی جا سکے۔</p>
        </div>
      </article>
    </div>
  )
}