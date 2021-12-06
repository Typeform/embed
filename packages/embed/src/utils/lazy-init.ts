type fn = () => void

export const lazyInitialize = (target: Element, onIntersection: fn) => {
  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onIntersection()
        observer.unobserve(entry.target)
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback)
  observer.observe(target)
}
