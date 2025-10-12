import type { UseVirtualListReturn } from '@vueuse/core'
import type { Sculpture } from './useSculptureData'

const SCROLL_KEY = 'list-scroll'

export const useScrollPosition = (scrollTo: UseVirtualListReturn<Sculpture>['scrollTo']) => {
  const saveScrollPosition = (index: number) => {
    sessionStorage.setItem(SCROLL_KEY, String(index))
  }

  const restoreScrollPosition = () => {
    const saved = +(sessionStorage.getItem(SCROLL_KEY) || 0)
    requestAnimationFrame(() => scrollTo(saved))
  }

  return { saveScrollPosition, restoreScrollPosition }
}
