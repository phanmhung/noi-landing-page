import { messages } from '../i18n/content'

// Both translations participate in the same grid cell. The invisible copy
// reserves its natural dimensions without entering the accessibility tree.
const alternatives = new Map<string, string>()
function pair(a: unknown, b: unknown) {
  if (typeof a === 'string' && typeof b === 'string') {
    alternatives.set(a, b)
    alternatives.set(b, a)
  } else if (a && b && typeof a === 'object' && typeof b === 'object') {
    for (const key of Object.keys(a)) {
      pair((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
    }
  }
}
pair(messages.en, messages.vi)

export function StableText({ text }: { text: string }) {
  return <span className="stable-text"><span>{text}</span><span className="text-reserve" aria-hidden="true">{alternatives.get(text) ?? text}</span></span>
}
