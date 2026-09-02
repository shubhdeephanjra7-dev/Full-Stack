import '@testing-library/jest-dom/vitest'

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    media: '',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }
}

window.ResizeObserver = window.ResizeObserver || class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.requestAnimationFrame = window.requestAnimationFrame || function (cb) {
  return setTimeout(cb, 16)
}
window.cancelAnimationFrame = window.cancelAnimationFrame || function (id) {
  clearTimeout(id)
}
