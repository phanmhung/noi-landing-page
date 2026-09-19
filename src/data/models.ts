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
  { id: 'deepseek-v4-pro', name: 'deepseek-v4-pro', provider: 'DeepSeek', categories: ['coding', 'reasoning'], inputPrice: '4.600₫', outputPrice: '13.700₫', accent: 'blue' },
  { id: 'qwen-35-plus', name: 'QY-qwen3.5-plus', provider: 'Qwen', categories: ['coding', 'vietnamese'], inputPrice: '1.400₫', outputPrice: '8.400₫', accent: 'violet' },
  { id: 'qwen-35-flash', name: 'QY-qwen3.5-flash', provider: 'Qwen', categories: ['fast', 'vietnamese'], inputPrice: '600₫', outputPrice: '6.000₫', accent: 'teal' },
  { id: 'deepseek-v4-flash', name: 'deepseek-v4-flash', provider: 'DeepSeek', categories: ['fast', 'reasoning'], inputPrice: '1.500₫', outputPrice: '4.400₫', accent: 'coral' },
]
