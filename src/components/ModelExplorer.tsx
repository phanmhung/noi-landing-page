import { useState } from 'react'
import { usePreferences } from '../context/PreferencesContext'
import type { ModelCategory, ModelSummary } from '../data/models'

const categories: ModelCategory[] = ['all', 'coding', 'reasoning', 'fast', 'vietnamese']

export function ModelExplorer({ models }: { models: ModelSummary[] }) {
  const { copy } = usePreferences()
  const [activeCategory, setActiveCategory] = useState<ModelCategory>('all')
  const filteredModels = activeCategory === 'all'
    ? models
    : models.filter((model) => model.categories.includes(activeCategory))

  return (
    <section className="section models-section" id="models">
      <div className="container">
        <div className="models-heading">
          <div>
            <p className="eyebrow">{copy.models.eyebrow}</p>
            <h2 className="section-title">{copy.models.title}</h2>
          </div>
          <p className="section-copy">{copy.models.description}</p>
        </div>

        <div className="model-filters" aria-label={copy.models.title}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {copy.models[category]}
            </button>
          ))}
        </div>

        {filteredModels.length > 0 ? (
          <div className="model-grid">
            {filteredModels.map((model) => (
              <article className={`model-card accent-${model.accent}`} key={model.id}>
                <div className="model-card-top">
                  <span className="model-letter" aria-hidden="true">{model.provider.slice(0, 1)}</span>
                  <div><h3>{model.name}</h3><p>{model.provider}</p></div>
                </div>
                <div className="model-prices">
                  <p><span>{copy.models.input}</span><strong>{model.inputPrice}</strong></p>
                  <p><span>{copy.models.output}</span><strong>{model.outputPrice}</strong></p>
                </div>
                <div className="model-card-bottom">
                  <span className="sample-label">{copy.models.samplePrice}</span>
                  <div className="model-tags">
                    {model.categories.slice(0, 2).map((category) => <span key={category}>{copy.models[category]}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="model-empty">
            <span aria-hidden="true">○</span>
            <p>{copy.models.empty}</p>
            <button type="button" onClick={() => setActiveCategory('all')}>{copy.models.reset}</button>
          </div>
        )}
      </div>
    </section>
  )
}
