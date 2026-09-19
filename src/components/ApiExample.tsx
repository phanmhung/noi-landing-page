import { StableText } from './StableText'
import * as m from 'motion/react-m'
import { useState } from 'react'
import { usePreferences } from '../context/PreferencesContext'

type ExampleType = 'curl' | 'javascript'
type CopyStatus = 'idle' | 'success' | 'error'

const examples: Record<ExampleType, string> = {
  curl: `curl https://api.noi.example/v1/chat/completions \\
  -H "Authorization: Bearer noi_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{ "role": "user", "content": "Hello, Nối" }]
  }'`,
  javascript: `const response = await fetch(
  'https://api.noi.example/v1/chat/completions',
  {
    method: 'POST',
    headers: {
      Authorization: 'Bearer noi_your_key_here',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-v4-pro',
      messages: [{ role: 'user', content: 'Hello, Nối' }],
    }),
  },
)

const result = await response.json()`,
}

export function ApiExample() {
  const { copy } = usePreferences()
  const [activeExample, setActiveExample] = useState<ExampleType>('curl')
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')

  async function copyExample() {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(examples[activeExample])
      setCopyStatus('success')
    } catch {
      setCopyStatus('error')
    }
  }

  function selectExample(example: ExampleType) {
    setActiveExample(example)
    setCopyStatus('idle')
  }

  return (
        <div className="code-window">
          <div className="code-toolbar">
            <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
            <div className="code-tabs" role="tablist" aria-label={copy.api.title}>
              {(['curl', 'javascript'] as const).map((example) => (
                <button
                  key={example}
                  id={`tab-${example}`}
                  type="button"
                  role="tab"
                  aria-selected={activeExample === example}
                  aria-controls="code-example-panel"
                  tabIndex={activeExample === example ? 0 : -1}
                  onKeyDown={event => {
                    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
                      event.preventDefault()
                      const next = event.key === 'Home' ? 'curl' : event.key === 'End' ? 'javascript' : activeExample === 'curl' ? 'javascript' : 'curl'
                      selectExample(next)
                      document.getElementById(`tab-${next}`)?.focus()
                    }
                  }}
                  onClick={() => selectExample(example)}
                >
                  <StableText text={copy.api[example]} />
                </button>
              ))}
            </div>
            <button className="copy-button" type="button" onClick={copyExample}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
              <StableText text={copy.api.copy} />
            </button>
          </div>
          <div
            className="code-panel"
            id="code-example-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeExample}`}
          >
            <m.pre key={activeExample} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }}><code>{examples[activeExample]}</code></m.pre>
          </div>
          <p className={`copy-status status-${copyStatus}`} aria-live="polite">
            {copyStatus === 'success' ? copy.api.copied : copyStatus === 'error' ? copy.api.copyFailed : '\u00a0'}
          </p>
        </div>

  )
}
