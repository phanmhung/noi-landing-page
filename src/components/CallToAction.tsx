import { usePreferences } from '../context/PreferencesContext'
import { BrandMark } from './BrandMark'

export function CallToAction() {
  const { copy } = usePreferences()

  return (
    <section className="section cta-section" id="get-started">
      <div className="container">
        <div className="cta-card">
          <BrandMark size={58} className="cta-mark" />
          <h2>{copy.cta.title}</h2>
          <p>{copy.cta.description}</p>
          <a className="button button-light" href="#docs">{copy.cta.action}<span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  )
}
