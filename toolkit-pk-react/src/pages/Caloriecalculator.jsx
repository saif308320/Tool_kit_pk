import { useState } from 'react'

const ACTIVITY = [
  { key: '1.2', en: 'Sedentary (little/no exercise)', ur: 'کم و بیش ورزش نہیں' },
  { key: '1.375', en: 'Light (1-3 days/week)', ur: 'ہلکی ورزش (ہفتے میں 1-3 دن)' },
  { key: '1.55', en: 'Moderate (3-5 days/week)', ur: 'درمیانی ورزش (ہفتے میں 3-5 دن)' },
  { key: '1.725', en: 'Active (6-7 days/week)', ur: 'زیادہ ورزش (ہفتے میں 6-7 دن)' },
  { key: '1.9', en: 'Very Active (athlete)', ur: 'بہت زیادہ فعال (ایتھلیٹ)' },
]

const GOALS = [
  { key: 'lose', en: 'Lose Weight', ur: 'وزن کم کریں', adj: -500, icon: '📉' },
  { key: 'maintain', en: 'Maintain Weight', ur: 'وزن برقرار رکھیں', adj: 0, icon: '⚖️' },
  { key: 'gain', en: 'Gain Weight', ur: 'وزن بڑھائیں', adj: 500, icon: '📈' },
]

export default function CalorieCalculator() {
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState('1.2')
  const [goal, setGoal] = useState('maintain')
  const [result, setResult] = useState(null)

  function calculate() {
    const a = parseFloat(age) || 0
    const h = parseFloat(height) || 0
    const w = parseFloat(weight) || 0
    let bmr = 10 * w + 6.25 * h - 5 * a
    bmr += gender === 'male' ? 5 : -161
    const tdee = bmr * parseFloat(activity)

    const g = GOALS.find((x) => x.key === goal)
    const targetCalories = Math.max(1200, tdee + g.adj)

    // Macro split — moderate protein/carb/fat split (30/40/30)
    const proteinG = Math.round((targetCalories * 0.30) / 4)
    const carbsG = Math.round((targetCalories * 0.40) / 4)
    const fatG = Math.round((targetCalories * 0.30) / 9)

    setResult({ bmr, tdee, targetCalories, proteinG, carbsG, fatG })
  }

  return (
    <div className="calc-wrap">
      <div className="calc-header">
        <h1 className="en-only">Calorie / BMR Calculator</h1>
        <h1 className="ur-only ur-text">کیلوری / بی ایم آر کیلکولیٹر</h1>
        <p className="calc-intro en-only">Find your daily calorie needs based on your BMR, activity level, and goal — with a macro breakdown.</p>
        <p className="calc-intro ur-only ur-text">اپنی روزانہ درکار کیلوریز اپنے بی ایم آر، سرگرمی اور مقصد کے مطابق معلوم کریں۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label><span className="en-only">Gender</span><span className="ur-only ur-text">جنس</span></label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="rate-grid">
          <div className="field">
            <label><span className="en-only">Age (years)</span><span className="ur-only ur-text">عمر (سال)</span></label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 25" />
          </div>
          <div className="field">
            <label><span className="en-only">Height (cm)</span><span className="ur-only ur-text">قد (سینٹی میٹر)</span></label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 170" />
          </div>
        </div>
        <div className="field">
          <label><span className="en-only">Weight (kg)</span><span className="ur-only ur-text">وزن (کلوگرام)</span></label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 65" />
        </div>
        <div className="field">
          <label><span className="en-only">Activity Level</span><span className="ur-only ur-text">سرگرمی کی سطح</span></label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)}>
            {ACTIVITY.map((a) => <option key={a.key} value={a.key}>{a.en}</option>)}
          </select>
        </div>
        <div className="field">
          <label><span className="en-only">Your Goal</span><span className="ur-only ur-text">آپ کا مقصد</span></label>
          <div className="chip-row">
            {GOALS.map((g) => (
              <button key={g.key} type="button" className={'chip' + (goal === g.key ? ' active' : '')} onClick={() => setGoal(g.key)}>
                {g.icon} {g.en}
              </button>
            ))}
          </div>
        </div>

        <button className="btn" onClick={calculate}>
          <span className="en-only">Calculate</span>
          <span className="ur-only ur-text">حساب لگائیں</span>
        </button>

        {result && (
          <div className="result-box show">
            <div className="label en-only">Daily Target Calories</div>
            <div className="label ur-only ur-text">روزانہ درکار کیلوریز</div>
            <div className="value">{Math.round(result.targetCalories).toLocaleString()} kcal</div>

            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-icon">🔥</div>
                <div className="stat-value">{Math.round(result.bmr).toLocaleString()}</div>
                <div className="stat-label en-only">BMR (kcal/day)</div>
                <div className="stat-label ur-only ur-text">بی ایم آر</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-value">{Math.round(result.tdee).toLocaleString()}</div>
                <div className="stat-label en-only">TDEE (maintenance)</div>
                <div className="stat-label ur-only ur-text">TDEE</div>
              </div>
            </div>

            <div className="label en-only" style={{ marginTop: 18 }}>Suggested Daily Macros</div>
            <div className="label ur-only ur-text" style={{ marginTop: 18 }}>تجویز کردہ روزانہ میکروز</div>
            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-icon">🍗</div>
                <div className="stat-value">{result.proteinG} g</div>
                <div className="stat-label en-only">Protein</div>
                <div className="stat-label ur-only ur-text">پروٹین</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🍚</div>
                <div className="stat-value">{result.carbsG} g</div>
                <div className="stat-label en-only">Carbs</div>
                <div className="stat-label ur-only ur-text">کاربوہائیڈریٹ</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🥑</div>
                <div className="stat-value">{result.fatG} g</div>
                <div className="stat-label en-only">Fat</div>
                <div className="stat-label ur-only ur-text">چکنائی</div>
              </div>
            </div>
            <div className="field-note en-only">Macro split based on a balanced 30% protein / 40% carbs / 30% fat ratio.</div>
            <div className="field-note ur-only ur-text">میکرو تناسب: 30% پروٹین / 40% کاربوہائیڈریٹ / 30% چکنائی۔</div>
          </div>
        )}
      </div>

      <article className="article">
        <div className="en-only">
          <h2>What is BMR?</h2>
          <p>Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest just to maintain basic functions like breathing, circulation, and cell repair.</p>
          <h2>What is TDEE?</h2>
          <p>Total Daily Energy Expenditure (TDEE) adds your activity level on top of BMR, giving the total calories you burn — and need to eat — each day to maintain your current weight.</p>
          <h2>How are goal calories set?</h2>
          <p>To lose weight, this calculator applies a moderate 500 kcal/day deficit below your TDEE (roughly 0.5 kg/week of fat loss). To gain weight, it applies a 500 kcal/day surplus. Always adjust gradually and consult a nutritionist for a personalized plan.</p>
        </div>
        <div className="ur-only ur-text">
          <h2>BMR کیا ہے؟</h2>
          <p>بیسل میٹابولک ریٹ وہ کیلوریز ہیں جو آپ کا جسم مکمل آرام کی حالت میں بھی بنیادی افعال کے لیے خرچ کرتا ہے۔</p>
          <h2>TDEE کیا ہے؟</h2>
          <p>یہ آپ کے BMR کے ساتھ آپ کی سرگرمی شامل کر کے روزانہ کل درکار کیلوریز بتاتا ہے۔</p>
        </div>
      </article>
    </div>
  )
}