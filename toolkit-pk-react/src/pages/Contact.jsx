export default function Contact() {
  return (
    <div className="static-page">
      <h1 className="en-only">Contact Us</h1>
      <h1 className="ur-only ur-text">ہم سے رابطہ کریں</h1>

      <div className="en-only">
        <p>Have a question, suggestion, or found a bug? We would love to hear from you.</p>
        <p>Email us at: <a href="mailto:contact@toolkitpk.com" style={{ color: 'var(--green)' }}>contact@toolkitpk.com</a></p>
      </div>

      <div className="ur-only ur-text">
        <p>کوئی سوال یا تجویز ہے؟ ہمیں بتائیں۔</p>
        <p>ای میل کریں: <a href="mailto:contact@toolkitpk.com" style={{ color: 'var(--green)' }}>contact@toolkitpk.com</a></p>
      </div>
    </div>
  )
}
