import { usePreferences } from '../context/PreferencesContext'

const providerNodes = [
  { name: 'OpenAI', className: 'provider-node provider-one' },
  { name: 'Claude', className: 'provider-node provider-two' },
  { name: 'Gemini', className: 'provider-node provider-three' },
  { name: 'DeepSeek', className: 'provider-node provider-four' },
]

export function RoutingVisual() {
  const { copy } = usePreferences()

  return (
    <figure className="routing-visual" aria-label={copy.hero.visualLabel}>
      <div className="routing-glow" aria-hidden="true" />
      <svg className="routing-lines" viewBox="0 0 560 500" aria-hidden="true">
        <path d="M108 83 C200 83 180 232 278 250" />
        <path d="M452 83 C360 83 380 232 282 250" />
        <path d="M108 417 C200 417 180 268 278 250" />
        <path d="M452 417 C360 417 380 268 282 250" />
        <path className="route-output" d="M315 250 C390 250 412 250 476 250" />
      </svg>
      {providerNodes.map((provider) => (
        <div key={provider.name} className={provider.className} aria-hidden="true">
          <span>{provider.name.slice(0, 1)}</span>
          {provider.name}
        </div>
      ))}
      <div className="noi-node" aria-hidden="true">
        <span className="noi-node-mark">N</span>
        <strong>Nối</strong>
        <small>Gateway</small>
      </div>
      <div className="app-node" aria-hidden="true">
        <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M7 9h10M7 13h5" /></svg>
        <span>{copy.hero.appLabel}</span>
      </div>
      <figcaption className="sr-only">{copy.hero.visualLabel}</figcaption>
    </figure>
  )
}
