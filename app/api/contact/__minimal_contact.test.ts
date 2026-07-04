import fc from 'fast-check';
import { POST } from './route';

jest.mock('next/server', () => ({
  NextResponse: {
    json: (body, init) => ({ status: init?.status ?? 200, json: async () => body }),
  },
}));
jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: jest.fn().mockReturnValue(true),
  startRateLimitCleanup: jest.fn(),
}));
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn().mockResolvedValue({ data: { id: 'test-id' } }) },
  })),
}));

const ORIGINAL_ENV = process.env;
beforeEach(() => {
  process.env = { ...ORIGINAL_ENV };
  process.env.RESEND_API_KEY = 're_test_key';
  process.env.RESEND_FROM = 'test@example.com';
  process.env.CONTACT_RECEIVER_EMAIL = 'receiver@example.com';
});
afterEach(() => {
  process.env = ORIGINAL_ENV;
});

describe('minimal contact test', () => {
  it('works', async () => {
    const validPayload = fc.record({
      name: fc.string({ minLength: 2, maxLength: 10 }),
      email: fc.emailAddress(),
      subject: fc.string({ minLength: 2, maxLength: 10 }),
      message: fc.string({ minLength: 10, maxLength: 20 }),
    });
    await fc.assert(
      fc.asyncProperty(validPayload, async (payload) => {
        const req = new Request('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const response = await POST(req);
        expect(response.status).toBe(200);
      }),
      { numRuns: 3 },
    );
  }, 15000);
});
