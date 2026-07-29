import SeoHead from '../components/SeoHead.jsx'
import { SEO } from '../seoData.js'

export default function About() {
  return (
    <div className="static-page">
      <SeoHead {...SEO.about} />
      <h1 className="en-only">About ToolKitPK</h1>
      <h1 className="ur-only ur-text">ٹول کٹ پی کے کے بارے میں</h1>

      <div className="en-only">
        <p>ToolKitPK was built to give people in Pakistan free, fast, and reliable everyday calculators — from Zakat and loan installments to salary tax and unit conversions — without any sign-up, clutter, or unnecessary complexity.</p>

        <p>Every tool on this site is designed to be simple to use on both mobile and desktop, with results calculated instantly right in your browser — your numbers never leave your device. We support both English and Urdu throughout the site, so you can switch languages at any time.</p>

        <h2>Why ToolKitPK?</h2>
        <p>Most calculator apps and websites are cluttered with ads, require downloads, or aren't built with Pakistan's specific needs in mind — things like Zakat Nisab, local tax slabs, PKR currency, and Namaz timings for Pakistani cities. ToolKitPK focuses on exactly these everyday needs, in one place.</p>

        <h2>Our Tools</h2>
        <p>We currently offer 20+ free calculators across five categories: Islamic tools (Zakat, Namaz Timings, Islamic Date Converter), Finance (Currency, Compound Interest, Salary Tax, Discounts), Loans & Bills (EMI, Electricity, Fuel Cost), Utility (Unit Conversion, Percentage, GPA, Word Counter, Password Generator), and Health & Life (BMI, Calorie/BMR, Age, Pregnancy Due Date, Date Countdown).</p>

        <h2>Our Mission</h2>
        <p>We believe everyday financial, religious, and personal calculations shouldn't require downloading an app or creating an account. ToolKitPK exists to make these calculations fast, accurate, private, and accessible to everyone in Pakistan, completely free of cost.</p>

        <h2>Get in Touch</h2>
        <p>Have feedback, found an issue, or want to suggest a new calculator? Visit our <a href="/contact">Contact page</a> — we read every message.</p>
      </div>

      <div className="ur-only ur-text">
        <p>ٹول کٹ پی کے پاکستان میں لوگوں کو مفت، تیز اور قابل بھروسہ روزمرہ کیلکولیٹرز فراہم کرنے کے لیے بنایا گیا ہے — زکوٰۃ اور قرض کی اقساط سے لے کر تنخواہ ٹیکس اور یونٹ کنورژن تک — بغیر کسی سائن اپ یا پیچیدگی کے۔</p>

        <p>اس سائٹ کے تمام ٹولز موبائل اور ڈیسک ٹاپ دونوں پر استعمال میں آسان ہیں، اور نتائج آپ کے براؤزر میں فوری طور پر ظاہر ہوتے ہیں — آپ کا ڈیٹا کبھی آپ کے ڈیوائس سے باہر نہیں جاتا۔</p>

        <h2>ہمارے ٹولز</h2>
        <p>ہم فی الحال پانچ کیٹیگریز میں 20 سے زیادہ مفت کیلکولیٹرز پیش کرتے ہیں: اسلامی ٹولز، فنانس، قرض اور بلز، یوٹیلیٹی، اور صحت اور زندگی۔</p>

        <h2>ہمارا مقصد</h2>
        <p>ہمارا ماننا ہے کہ روزمرہ کے مالی، مذہبی اور ذاتی حسابات کے لیے کسی ایپ یا اکاؤنٹ کی ضرورت نہیں ہونی چاہیے۔ ٹول کٹ پی کے کا مقصد ان حسابات کو تیز، درست اور ہر پاکستانی کے لیے مکمل طور پر مفت بنانا ہے۔</p>

        <h2>رابطہ کریں</h2>
        <p>کوئی رائے، مسئلہ، یا نئے کیلکولیٹر کی تجویز ہے؟ ہمارے <a href="/contact">رابطہ کے صفحے</a> پر جائیں۔</p>
      </div>
    </div>
  )
}