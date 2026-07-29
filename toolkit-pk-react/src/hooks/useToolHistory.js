import { useCallback, useEffect, useState } from 'react'
import { TOOLS, CURATED_POPULAR_HREFS, getToolByHref } from '../toolsData.js'

const STORAGE_KEY = 'tkpk_tool_history_v1'
const MAX_RECENT = 4

function readHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeHistory(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage unavailable (private mode etc.) — fail silently
  }
}

/**
 * Records a visit to `href` (call this once per page load from Layout.jsx).
 * Safe to call outside React too — exported standalone for that reason.
 */
export function recordToolVisit(href) {
  if (!getToolByHref(href)) return // not a tool page (e.g. home, about)
  const data = readHistory()
  const entry = data[href] || { count: 0, lastVisited: 0 }
  entry.count += 1
  entry.lastVisited = Date.now()
  data[href] = entry
  writeHistory(data)
}

/**
 * Hook for reading tool history in components (Home.jsx).
 * Returns { recent, popular } — both arrays of tool objects from toolsData.
 */
export function useToolHistory() {
  const [history, setHistory] = useState(() => readHistory())

  // Re-read if another tab/page updates it
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setHistory(readHistory())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const refresh = useCallback(() => setHistory(readHistory()), [])

  const recent = Object.entries(history)
    .sort((a, b) => b[1].lastVisited - a[1].lastVisited)
    .slice(0, MAX_RECENT)
    .map(([href]) => getToolByHref(href))
    .filter(Boolean)

  // Popular = real click counts once we have enough data (3+ tools with
  // at least 2 visits), otherwise fall back to the curated list so the
  // homepage never looks empty for new visitors.
  const withCounts = Object.entries(history)
    .filter(([, v]) => v.count >= 2)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([href]) => getToolByHref(href))
    .filter(Boolean)

  const popular = withCounts.length >= 3
    ? withCounts.slice(0, 4)
    : CURATED_POPULAR_HREFS.map(getToolByHref).filter(Boolean)

  return { recent, popular, refresh }
}