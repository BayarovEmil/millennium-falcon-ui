import type { LifeAreaDto } from '../../api/types'
import { api } from '../../lib/api/client'

export function listLifeAreas(): Promise<LifeAreaDto[]> {
  return api.get<LifeAreaDto[]>('/api/life-areas')
}
