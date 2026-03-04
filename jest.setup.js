// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock Framer Motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    article: ({ children, ...props }) => <article {...props}>{children}</article>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    header: ({ children, ...props }) => <header {...props}>{children}</header>,
    footer: ({ children, ...props }) => <footer {...props}>{children}</footer>,
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock Lenis smooth scroll
jest.mock('lenis', () => {
  return jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    off: jest.fn(),
    destroy: jest.fn(),
    scrollTo: jest.fn(),
  }))
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
