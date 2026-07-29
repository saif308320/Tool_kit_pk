import SeoHead from '../components/SeoHead.jsx'
import { SEO } from '../seoData.js'

export default function Privacy() {
  return (
    <div className="static-page">
      <SeoHead {...SEO.privacy} />
      <h1 className="en-only">Privacy Policy</h1>
      <h1 className="ur-only ur-text">پرائیویسی پالیسی</h1>

      <div className="en-only">
        <p>Last updated: 2026. This Privacy Policy explains how ToolKitPK ("we", "us") handles information when you use our website.</p>

        <h2>Information We Collect</h2>
        <p>ToolKitPK does not require you to create an account. Values you enter into our calculators (height, weight, salary, dates, etc.) are processed directly in your browser and are not sent to or stored on our servers.</p>

        <h2>Automatically Collected Data</h2>
        <p>Like most websites, we may automatically collect standard technical information such as browser type, device type, pages visited, and approximate location, through analytics tools, for the purpose of understanding site usage and improving performance.</p>

        <h2>Cookies and Advertising</h2>
        <p>We use third-party advertising and analytics companies, including Google AdSense and Google Analytics, which may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.</p>

        <h2>Third-Party Links</h2>
        <p>Our site may contain links to third-party websites. We are not responsible for the privacy practices of those sites.</p>

        <h2>Children's Privacy</h2>
        <p>ToolKitPK is not directed at children under 13, and we do not knowingly collect personal information from children.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page.</p>

        <h2>Contact</h2>
        <p>Questions about this policy can be sent to <a href="mailto:toolkitpk.com@gmail.com" style={{ color: 'var(--green)' }}>toolkitpk.com@gmail.com</a>.</p>
      </div>

      <div className="ur-only ur-text">
        <p>آخری بار اپ ڈیٹ: 2026۔ یہ پرائیویسی پالیسی بتاتی ہے کہ ٹول کٹ پی کے آپ کی معلومات کو کیسے ہینڈل کرتا ہے۔</p>

        <h2>ہم کون سی معلومات جمع کرتے ہیں</h2>
        <p>ٹول کٹ پی کے استعمال کرنے کے لیے اکاؤنٹ کی ضرورت نہیں۔ آپ کے درج کردہ اعداد و شمار (قد، وزن، تنخواہ، تاریخیں وغیرہ) آپ کے براؤزر میں ہی پروسیس ہوتے ہیں اور ہمارے سرورز پر محفوظ نہیں کیے جاتے۔</p>

        <h2>خودکار طور پر جمع شدہ ڈیٹا</h2>
        <p>زیادہ تر ویب سائٹس کی طرح، ہم اینالیٹکس ٹولز کے ذریعے براؤزر کی قسم، ڈیوائس کی قسم، اور دیکھے گئے صفحات جیسی معیاری تکنیکی معلومات جمع کر سکتے ہیں۔</p>

        <h2>کوکیز اور اشتہارات</h2>
        <p>ہم Google AdSense اور Google Analytics جیسی تھرڈ پارٹی کمپنیاں استعمال کرتے ہیں جو کوکیز کا استعمال کر سکتی ہیں۔</p>

        <h2>رابطہ</h2>
        <p>اس پالیسی سے متعلق سوالات کے لیے <a href="mailto:toolkitpk.com@gmail.com" style={{ color: 'var(--green)' }}>toolkitpk.com@gmail.com</a> پر رابطہ کریں۔</p>
      </div>
    </div>
  )
}