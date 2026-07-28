import { useEffect, useRef, useState } from 'react'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function pad(n) { return String(n).padStart(2, '0') }
function toISO(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}` }
function parseISO(s) {
  if (!s) return null
  const [y, m, d] = s.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

/**
 * Premium calendar date picker — replaces the plain native <input type="date">.
 * value:    'YYYY-MM-DD' string (or '')
 * onChange: (isoString) => void
 * max/min:  optional 'YYYY-MM-DD' bounds
 */
export default function DatePicker({ value, onChange, placeholder = 'Select date', max, min }) {
  const [open, setOpen] = useState(false)
  const selected = parseISO(value)
  const today = new Date()
  const [viewY, setViewY] = useState((selected || today).getFullYear())
  const [viewM, setViewM] = useState((selected || today).getMonth())
  const ref = useRef(null)

  useEffect(() => {
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  // Keep the visible month/year in sync if the value changes from outside
  useEffect(() => {
    if (selected) {
      setViewY(selected.getFullYear())
      setViewM(selected.getMonth())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const maxDate = max ? parseISO(max) : null
  const minDate = min ? parseISO(min) : null

  function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate() }
  function firstWeekday(y, m) { return new Date(y, m, 1).getDay() }

  const numDays = daysInMonth(viewY, viewM)
  const startOffset = firstWeekday(viewY, viewM)
  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= numDays; d++) cells.push(d)

  function prevMonth() {
    if (viewM === 0) { setViewM(11); setViewY((y) => y - 1) } else setViewM((m) => m - 1)
  }
  function nextMonth() {
    if (viewM === 11) { setViewM(0); setViewY((y) => y + 1) } else setViewM((m) => m + 1)
  }

  function pick(d) {
    onChange(toISO(viewY, viewM, d))
    setOpen(false)
  }

  function goToday() {
    setViewY(today.getFullYear())
    setViewM(today.getMonth())
    onChange(toISO(today.getFullYear(), today.getMonth(), today.getDate()))
    setOpen(false)
  }

  function isDisabled(d) {
    const dt = new Date(viewY, viewM, d)
    if (maxDate && dt > maxDate) return true
    if (minDate && dt < minDate) return true
    return false
  }
  function isToday(d) {
    return viewY === today.getFullYear() && viewM === today.getMonth() && d === today.getDate()
  }
  function isSelected(d) {
    return !!selected && viewY === selected.getFullYear() && viewM === selected.getMonth() && d === selected.getDate()
  }

  const label = selected
    ? selected.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : placeholder

  return (
    <div className={'datepicker' + (open ? ' open' : '')} ref={ref}>
      <button type="button" className={'datepicker-trigger' + (selected ? '' : ' placeholder')} onClick={() => setOpen((o) => !o)}>
        <span className="dp-trigger-icon">📅</span>
        <span className="dp-trigger-label">{label}</span>
        <svg className="chev" viewBox="0 0 20 20" fill="none">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="datepicker-panel">
          <div className="dp-header">
            <button type="button" className="dp-nav-btn" onClick={prevMonth} aria-label="Previous month">‹</button>
            <div className="dp-month-year">{MONTHS[viewM]} {viewY}</div>
            <button type="button" className="dp-nav-btn" onClick={nextMonth} aria-label="Next month">›</button>
          </div>
          <div className="dp-weekdays">
            {WEEKDAYS.map((w) => <div key={w} className="dp-weekday">{w}</div>)}
          </div>
          <div className="dp-grid">
            {cells.map((d, i) => d === null ? (
              <div key={'e' + i} className="dp-day empty" />
            ) : (
              <button
                type="button"
                key={d}
                className={
                  'dp-day' +
                  (isSelected(d) ? ' selected' : '') +
                  (isToday(d) && !isSelected(d) ? ' today' : '') +
                  (isDisabled(d) ? ' disabled' : '')
                }
                disabled={isDisabled(d)}
                onClick={() => pick(d)}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="dp-footer">
            <button type="button" className="dp-today-btn" onClick={goToday}>Today</button>
          </div>
        </div>
      )}
    </div>
  )
}