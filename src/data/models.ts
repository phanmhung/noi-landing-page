export type ModelCategory = 'all' | 'coding' | 'reasoning' | 'fast' | 'vietnamese'

export interface ModelSummary {
  id: string
  name: string
  provider: string
  categories: Exclude<ModelCategory, 'all'>[]
  inputPrice: string
  outputPrice: string
  accent: 'blue' | 'teal' | 'coral' | 'violet'
}

export const models: ModelSummary[] = [
  { id: 'deepseek-v4-pro', name: 'deepseek-v4-pro', provider: 'DeepSeek', categories: ['coding', 'reasoning'], inputPrice: '¥1.30', outputPrice: '¥3.92', accent: 'blue' },
  { id: 'qwen-35-plus', name: 'QY-qwen3.5-plus', provider: 'Qwen', categories: ['coding', 'vietnamese'], inputPrice: '¥0.400', outputPrice: '¥2.40', accent: 'violet' },
  { id: 'qwen-35-flash', name: 'QY-qwen3.5-flash', provider: 'Qwen', categories: ['fast', 'vietnamese'], inputPrice: '¥0.172', outputPrice: '¥1.72', accent: 'teal' },
  { id: 'deepseek-v4-flash', name: 'deepseek-v4-flash', provider: 'DeepSeek', categories: ['fast', 'reasoning'], inputPrice: '¥0.420', outputPrice: '¥1.26', accent: 'coral' },
]
