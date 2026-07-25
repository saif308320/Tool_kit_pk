import { useEffect, useRef, useState } from 'react'

/**
 * options: [{ value, label, icon? }]
 */
export default function Select({ options, value, onChange, searchable = false, searchPlaceholder = 'Search...', emptyLabel = 'No results' }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', handleOutside)
    return () => document.removeEventListener('click', handleOutside)
  }, [])

  const filtered = searchable && query
    ? options.filter((o) => o.label.toUpperCase().includes(query.toUpperCase()))
    : options

  const current = options.find((o) => o.value === value)

  return (
    <div className={'cselect' + (open ? ' open' : '')} ref={ref}>
      <button type="button" className="cselect-trigger" onClick={() => { setOpen(!open); setQuery('') }}>
        <span className="cselect-current">
          {current?.icon && <span className="cselect-icon">{current.icon}</span>}
          {current ? current.label : ''}
        </span>
        <svg className="chev" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="cselect-panel">
        {searchable && (
          <div className="cselect-search">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
        )}
        <div className="cselect-list">
          {filtered.length === 0 && <div className="cselect-empty">{emptyLabel}</div>}
          {filtered.map((o) => (
            <div
              key={o.value}
              className={'cselect-option' + (o.value === value ? ' selected' : '')}
              onClick={() => { onChange(o.value); setOpen(false) }}
            >
              {o.icon && <span className="cselect-icon">{o.icon}</span>}
              {o.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
