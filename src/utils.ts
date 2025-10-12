import type { Sculpture } from './useSculptureData'

export const viewTransitionName = (sculpture: Sculpture) => {
  if (!sculpture.title) return 'defaultTransitionName'
  return sculpture.title.replace(/[^a-zA-Z]/g, '')
}
