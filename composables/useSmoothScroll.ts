export const useSmoothScroll = () => {
  const smoothScrollTo = (target: HTMLElement, duration = 1800) => {
    const startY = window.pageYOffset
    const targetY = target.getBoundingClientRect().top + window.pageYOffset
    const change = targetY - startY
    const startTime = performance.now()

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeInOutCubic(progress)
      
      window.scrollTo(0, startY + change * easedProgress)

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        if (target && target.focus) {
          target.setAttribute('tabindex', '-1')
          target.focus({ preventScroll: true })
        }
      }
    }

    requestAnimationFrame(animateScroll)
  }

  return { smoothScrollTo }
}
