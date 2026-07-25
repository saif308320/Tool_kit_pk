import { useEffect, useState } from 'react'

export default function TypeText({ words, typingSpeed = 140, deletingSpeed = 70, pause = 2000 }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!words || words.length === 0) return
    const current = words[index % words.length]

    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }

    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }

    const t = setTimeout(() => {
      setSubIndex((s) => s + (deleting ? -1 : 1))
    }, deleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(t)
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pause])

  const current = words && words.length ? words[index % words.length] : ''

  return (
    <span className="type-text">
      {current.substring(0, subIndex)}
      <span className="type-cursor">|</span>
    </span>
  )
}