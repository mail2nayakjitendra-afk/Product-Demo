export default function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="24" height="24" rx="6" fill="#0ea5a4" />
      <path d="M7 13c1.5-2 3.5-3 6-3" stroke="#042f2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 17c1.5-2 3.5-3 6-3" stroke="#052f3f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  )
}
