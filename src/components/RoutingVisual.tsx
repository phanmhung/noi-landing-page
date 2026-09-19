import { useId, useState } from 'react'
import { usePreferences } from '../context/PreferencesContext'
import './orbital.css'

const orbits = [
  { angle: -28, radius: 212, speed: '32s', color: '#72a9ff' },
  { angle: 38, radius: 182, speed: '41s', color: '#56e0d1' },
  { angle: 94, radius: 156, speed: '48s', color: '#b2caff' },
]

export function RoutingVisual() {
  const { copy, locale } = usePreferences()
  const [paused, setPaused] = useState(false)
  const id = useId().replace(/:/g, '')

  return (
    <figure className="orbital-visual" aria-label={copy.hero.visualLabel} data-paused={paused}>
      <div className="orbital-heading" aria-hidden="true"><span>NỐI / ORBITAL NETWORK</span><span className="orbital-status">●</span></div>
      <svg className="orbital-art" viewBox="0 0 560 460" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-halo`}><stop stopColor="#277ec5" stopOpacity=".42" /><stop offset="1" stopColor="#132a50" stopOpacity="0" /></radialGradient>
          <radialGradient id={`${id}-core`} cx="35%" cy="25%"><stop stopColor="#f3ffff" /><stop offset=".25" stopColor="#b5f5f0" /><stop offset=".6" stopColor="#418aca" /><stop offset="1" stopColor="#122d56" /></radialGradient>
          <linearGradient id={`${id}-beam`}><stop stopColor="#6cafff" stopOpacity="0" /><stop offset=".5" stopColor="#bcefff" /><stop offset="1" stopColor="#57e4d1" stopOpacity="0" /></linearGradient>
        </defs>
        {Array.from({ length: 45 }, (_, i) => <circle key={i} cx={(i * 137 + 23) % 550} cy={(i * 79 + 17) % 450} r={i % 7 === 0 ? 1.3 : .65} fill="#b7d8ff" opacity={.18 + (i % 4) * .12} />)}
        <circle cx="280" cy="230" r="220" fill={`url(#${id}-halo)`} />
        <g transform="translate(280 230)">
          <circle r="218" fill="none" stroke="#7bafd2" strokeOpacity=".1" strokeDasharray="1 11" />
          <path d="M-242 0H242M0-204V204" stroke="#7291b7" strokeOpacity=".12" strokeDasharray="3 7" />
          {orbits.map(orbit => (
            <g key={orbit.angle} transform={`rotate(${orbit.angle}) scale(1 .42)`}>
              <circle r={orbit.radius} fill="none" stroke={orbit.color} strokeOpacity=".32" />
              <g className="orbital-traveler" style={{ animationDuration: orbit.speed }}>
                <circle r={orbit.radius} fill="none" stroke={orbit.color} strokeWidth="2" strokeDasharray={`52 ${2 * Math.PI * orbit.radius - 52}`} opacity=".8" />
                <ellipse cx={orbit.radius} rx="3" ry="7" fill="#e4ffff" />
                <ellipse cx={orbit.radius} rx="7" ry="15" fill={orbit.color} opacity=".15" />
              </g>
            </g>
          ))}
          <path d="M-188 62Q-65 60 0 0T190-61" fill="none" stroke={`url(#${id}-beam)`} strokeWidth="1" />
          <circle r="51" fill="#70dbea" opacity=".05" />
          <circle r="43" fill="none" stroke="#90e7f4" strokeOpacity=".22" />
          <circle r="34" fill={`url(#${id}-core)`} />
          <path d="M-10 12V-12L10 12V-12" fill="none" stroke="#f1ffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className="orbital-labels" fill="#a5bdd8" fontSize="10" letterSpacing="1.5">
          <text x="65" y="120">MODELS</text><text x="384" y="342">ONE ENDPOINT</text>
          <path d="M108 129L150 157M379 326L357 301" stroke="#a5bdd8" strokeOpacity=".4" />
        </g>
      </svg>
      <div className="orbital-footer">
        <span aria-hidden="true">{locale === 'vi' ? 'Nhiều mô hình. Một kết nối.' : 'Many models. One connection.'}</span>
        <button type="button" className="orbital-pause" onClick={() => setPaused(value => !value)} aria-label={locale === 'vi' ? paused ? 'Tiếp tục chuyển động' : 'Dừng chuyển động' : paused ? 'Resume animation' : 'Pause animation'} aria-pressed={paused}>
          <svg viewBox="0 0 16 16" aria-hidden="true">{paused ? <path d="M5 3L12 8L5 13Z" /> : <path d="M5 3V13M11 3V13" />}</svg>
        </button>
      </div>
      <figcaption className="sr-only">{copy.hero.visualLabel}</figcaption>
    </figure>
  )
}
