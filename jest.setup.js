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
    svg: ({ children, ...props }) => <svg {...props}>{children}</svg>,
    path: ({ children, ...props }) => <path {...props}>{children}</path>,
    circle: ({ children, ...props }) => <circle {...props}>{children}</circle>,
    rect: ({ children, ...props }) => <rect {...props}>{children}</rect>,
    line: ({ children, ...props }) => <line {...props}>{children}</line>,
    polygon: ({ children, ...props }) => <polygon {...props}>{children}</polygon>,
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock Three.js / R3F dependencies (ESM packages Jest cannot parse)
jest.mock('@react-three/postprocessing', () => ({
  EffectComposer: ({ children }) => <div data-testid="effect-composer">{children}</div>,
  wrapEffect: () => 'div',
}))
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="r3f-canvas">{children}</div>,
  useFrame: () => {},
  useThree: () => ({ viewport: {}, size: {}, gl: {} }),
  extend: () => {},
  createPortal: (children) => children,
  ThreeEvent: {},
}))
jest.mock('three', () => ({
  Uniform: class { constructor(v) { this.value = v } },
  Vector2: class { constructor(x, y) { this.x = x || 0; this.y = y || 0 } set(x, y) { this.x = x; this.y = y } },
  Vector3: class { constructor(x, y, z) { this.x = x || 0; this.y = y || 0; this.z = z || 0 } },
  Color: class { constructor(...args) { this.r = 0; this.g = 0; this.b = 0 } set(...args) {} },
  Mesh: class {},
  PlaneGeometry: class {},
  ShaderMaterial: class {},
  MeshBasicMaterial: class {},
}))
jest.mock('postprocessing', () => ({
  Effect: class { constructor() {} },
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

// Polyfill Web API Request for tests (jsdom does not provide it)
if (typeof globalThis.Request === 'undefined') {
  globalThis.Request = class Request {
    constructor(input, init = {}) {
      this.url = typeof input === 'string' ? input : input.url;
      this.method = init.method || 'GET';
      this.headers = new Headers(init.headers || {});
      this.bodyUsed = false;
      this._body = init.body;
    }
    async json() {
      this.bodyUsed = true;
      return JSON.parse(this._body || '{}');
    }
    async text() {
      this.bodyUsed = true;
      return this._body || '';
    }
  };
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
