import SeoHead from '../components/SeoHead.jsx'
import { SEO } from '../seoData.js'

export default function Terms() {
  return (
    <div className="static-page">
      <SeoHead {...SEO.terms} />
      <h1 className="en-only">Terms of Service</h1>
      <h1 className="ur-only ur-text">شرائط و ضوابط</h1>

      <div className="en-only">
        <p>Last updated: 2026. By using ToolKitPK, you agree to the following terms.</p>

        <h2>Use of Our Tools</h2>
        <p>All calculators on ToolKitPK are provided for general informational purposes only, and do not constitute professional financial, medical, religious, or legal advice. For decisions involving significant money, health, or religious obligations, please consult a qualified professional (accountant, doctor, or scholar).</p>

        <h2>Accuracy</h2>
        <p>We make reasonable efforts to keep calculations (tax slabs, Zakat Nisab, fuel prices, etc.) up to date, but rates and rules can change. Always verify time-sensitive figures with an official source before relying on them for important decisions.</p>

        <h2>No Warranty</h2>
        <p>ToolKitPK is provided "as is" and "as available," without warranties of any kind, express or implied, including accuracy, reliability, or fitness for a particular purpose.</p>

        <h2>Limitation of Liability</h2>
        <p>ToolKitPK and its operators are not liable for any loss or damage arising from your use of, or reliance on, any calculator or content on this site.</p>

        <h2>Advertising</h2>
        <p>This site may display third-party advertisements (such as Google AdSense) to support free access to our tools.</p>

        <h2>Changes to These Terms</h2>
        <p>We may update these Terms from time to time. Continued use of the site after changes means you accept the updated Terms.</p>

        <h2>Contact</h2>
        <p>Questions about these Terms can be sent to <a href="mailto:toolkitpk.com@gmail.com" style={{ color: 'var(--green)' }}>toolkitpk.com@gmail.com</a>.</p>
      </div>

      <div className="ur-only ur-text">
        <p>آخری بار اپ ڈیٹ: 2026۔ ٹول کٹ پی کے استعمال کرتے ہوئے، آپ درج ذیل شرائط سے متفق ہوتے ہیں۔</p>

        <h2>ہمارے ٹولز کا استعمال</h2>
        <p>تمام کیلکولیٹرز صرف عمومی معلوماتی مقاصد کے لیے ہیں اور پیشہ ورانہ مالی، طبی، مذہبی، یا قانونی مشورہ نہیں ہیں۔ اہم فیصلوں کے لیے کسی مستند ماہر سے رجوع کریں۔</p>

        <h2>درستگی</h2>
        <p>ہم حساب کتاب (ٹیکس سلیب، زکوٰۃ نصاب، ایندھن کی قیمتیں وغیرہ) کو اپ ڈیٹ رکھنے کی کوشش کرتے ہیں، لیکن شرحیں تبدیل ہو سکتی ہیں۔</p>

        <h2>کوئی ضمانت نہیں</h2>
        <p>ٹول کٹ پی کے "جیسا ہے" کی بنیاد پر فراہم کیا جاتا ہے، بغیر کسی قسم کی ضمانت کے۔</p>

        <h2>رابطہ</h2>
        <p>ان شرائط سے متعلق سوالات کے لیے <a href="mailto:toolkitpk.com@gmail.com" style={{ color: 'var(--green)' }}>toolkitpk.com@gmail.com</a> پر رابطہ کریں۔</p>
      </div>
    </div>
  )
}