import { StableText } from './StableText'
import * as m from 'motion/react-m'
import { usePreferences } from '../context/PreferencesContext'
import { providerNames } from '../data/site'
import { RoutingVisual } from './RoutingVisual'

export function Hero() {
  const { copy } = usePreferences()

  return (
    <section className="hero" id="top">
      <div className="hero-wash" aria-hidden="true" />
      <div className="container hero-grid">
        <m.div className="hero-copy" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="eyebrow"><span className="eyebrow-dot" /><StableText text={copy.hero.eyebrow} /></p>
          <h1><StableText text={copy.hero.title} /></h1>
          <p className="hero-description"><StableText text={copy.hero.description} /></p>
          <div className="hero-actions">
            <a className="button button-primary" href="#get-started"><StableText text={copy.hero.primary} /><span aria-hidden="true">→</span></a>
            <a className="button button-secondary" href="#process"><StableText text={copy.hero.secondary} /></a>
          </div>
          <div className="provider-proof">
            <p><StableText text={copy.hero.providerLead} /></p>
            <div className="provider-list" aria-label={providerNames.join(', ')}>
              {providerNames.map((provider) => <span key={provider}>{provider}</span>)}
            </div>
          </div>
        </m.div>
        <RoutingVisual />
      </div>
    </section>
  )
}
