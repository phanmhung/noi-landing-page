import { usePreferences } from '../context/PreferencesContext'
import { featureIcons } from '../data/site'

function FeatureIcon({ name }: { name: (typeof featureIcons)[number] }) {
  const paths = {
    route: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 7.5c5 1 3 7 8 9" /></>,
    fallback: <><path d="M5 8a8 8 0 0 1 14 3" /><path d="m16 8 3 3 3-3M19 16a8 8 0 0 1-14-3" /><path d="m8 16-3-3-3 3" /></>,
    key: <><circle cx="8" cy="12" r="4" /><path d="M12 12h9M18 12v3M15 12v2" /></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19V3" /></>,
    swap: <><path d="M4 8h14M15 5l3 3-3 3M20 16H6M9 13l-3 3 3 3" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

export function FeatureGrid() {
  const { copy } = usePreferences()

  return (
    <section className="section features-section" id="features">
      <div className="container">
        <div className="section-heading split-heading">
          <div><p className="eyebrow">{copy.features.eyebrow}</p><h2 className="section-title">{copy.features.title}</h2></div>
          <p className="section-copy">{copy.features.description}</p>
        </div>
        <div className="feature-grid">
          {copy.features.items.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon"><FeatureIcon name={featureIcons[index]} /></div>
              <span className="feature-index">0{index + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
