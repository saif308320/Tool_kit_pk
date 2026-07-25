export default function LogoMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="url(#tkpk-logo-grad)" />
      <path d="M12 14.5H26M12 20H26M12 25.5H20" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" />
      <circle cx="27.5" cy="25.5" r="2.3" fill="#fff" />
      <defs>
        <linearGradient id="tkpk-logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d9488" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  )
}
