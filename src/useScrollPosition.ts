const SCROLL_KEY = 'list-scroll'

export const useScrollPosition = () => {
  const saveScrollPosition = () => {
    const currentScroll = document.scrollingElement?.scrollTop ?? 0
    sessionStorage.setItem(SCROLL_KEY, String(currentScroll))
  }

  const restoreScrollPosition = () => {
    const saved = +(sessionStorage.getItem(SCROLL_KEY) || 0)
    requestAnimationFrame(() => window.scrollTo(0, saved))
  }

  return { saveScrollPosition, restoreScrollPosition }
}
