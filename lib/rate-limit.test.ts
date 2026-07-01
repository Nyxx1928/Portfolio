import { checkRateLimit, startRateLimitCleanup } from './rate-limit';

describe('checkRateLimit', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('allows first 5 requests from same IP', () => {
    expect(checkRateLimit('127.0.0.1', 5, 60_000)).toBe(true);
    expect(checkRateLimit('127.0.0.1', 5, 60_000)).toBe(true);
    expect(checkRateLimit('127.0.0.1', 5, 60_000)).toBe(true);
    expect(checkRateLimit('127.0.0.1', 5, 60_000)).toBe(true);
    expect(checkRateLimit('127.0.0.1', 5, 60_000)).toBe(true);
  });

  it('blocks 6th request within window', () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit('127.0.0.1', 5, 60_000);
    }
    expect(checkRateLimit('127.0.0.1', 5, 60_000)).toBe(false);
  });

  it('resets after window expires', () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit('127.0.0.1', 5, 60_000);
    }
    expect(checkRateLimit('127.0.0.1', 5, 60_000)).toBe(false);

    jest.advanceTimersByTime(60_001);

    expect(checkRateLimit('127.0.0.1', 5, 60_000)).toBe(true);
  });

  it('different IPs have independent counters', () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit('192.168.1.1', 5, 60_000);
    }
    expect(checkRateLimit('192.168.1.1', 5, 60_000)).toBe(false);
    expect(checkRateLimit('10.0.0.1', 5, 60_000)).toBe(true);
    expect(checkRateLimit('10.0.0.2', 5, 60_000)).toBe(true);
  });
});

describe('startRateLimitCleanup', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('removes expired entries', () => {
    checkRateLimit('127.0.0.1', 5, 60_000);
    checkRateLimit('10.0.0.1', 5, 60_000);

    jest.advanceTimersByTime(60_001);

    const cleanup = startRateLimitCleanup(60_000);
    jest.advanceTimersByTime(60_000);

    cleanup();
    expect(checkRateLimit('127.0.0.1', 5, 60_000)).toBe(true);
    expect(checkRateLimit('10.0.0.1', 5, 60_000)).toBe(true);
  });
});
