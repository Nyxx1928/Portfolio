import { startRateLimitCleanup } from '@/lib/rate-limit';

/**
 * Next.js instrumentation hook — runs once when the Node.js server runtime
 * starts (not per-request, not in the browser).
 *
 * The in-memory rate-limit store (`lib/rate-limit.ts`) accumulates an entry per
 * unique client IP. Without periodic eviction the Map grows without bound for
 * the lifetime of the process. We start the cleanup interval here so expired
 * entries are evicted every 60s.
 *
 * Note: in true serverless/edge deployments each cold start gets a fresh
 * process, so this in-memory store is best-effort. For strict cross-instance
 * rate limiting, migrate to a shared store (e.g. Upstash Redis).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    startRateLimitCleanup();
  }
}
