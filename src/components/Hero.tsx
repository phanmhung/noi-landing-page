import { usePreferences } from '../context/PreferencesContext'
import { providerNames } from '../data/site'
import { RoutingVisual } from './RoutingVisual'

export function Hero() {
  const { copy } = usePreferences()

  return (
    <section className="hero" id="top">
      <div className="hero-wash" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" />{copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}</h1>
          <p className="hero-description">{copy.hero.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#get-started">{copy.hero.primary}<span aria-hidden="true">→</span></a>
            <a className="button button-secondary" href="#process">{copy.hero.secondary}</a>
          </div>
          <div className="provider-proof">
            <p>{copy.hero.providerLead}</p>
            <div className="provider-list" aria-label={providerNames.join(', ')}>
              {providerNames.map((provider) => <span key={provider}>{provider}</span>)}
            </div>
          </div>
        </div>
        <RoutingVisual />
      </div>
    </section>
  )
}
