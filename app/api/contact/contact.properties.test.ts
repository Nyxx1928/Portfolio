import fc from 'fast-check';
import { POST } from './route';

jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      json: async () => body,
    }),
  },
}));

jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: jest.fn().mockReturnValue(true),
  startRateLimitCleanup: jest.fn(),
}));

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 'test-id' } }),
    },
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

function makeRequest(body: unknown): Request {
  return new Request('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const validEmail = fc.emailAddress();

const validString = fc.string({ minLength: 2, maxLength: 50 });

const validPayload = fc.record({
  name: validString,
  email: validEmail,
  subject: validString,
  message: fc.string({ minLength: 10, maxLength: 100 }),
});

const partialPayload = fc
  .record({
    name: fc.option(validString, { nil: undefined }),
    email: fc.option(validEmail, { nil: undefined }),
    subject: fc.option(validString, { nil: undefined }),
    message: fc.option(fc.string({ minLength: 10, maxLength: 100 }), { nil: undefined }),
  })
  .filter((obj) => {
    const values = [obj.name, obj.email, obj.subject, obj.message];
    const defined = values.filter((v) => v !== undefined);
    return defined.length > 0 && defined.length < 4;
  });

const emptyStringPayload = fc.record({
  name: fc.constantFrom(''),
  email: fc.constantFrom(''),
  subject: fc.constantFrom(''),
  message: fc.constantFrom(''),
});

describe('POST /api/contact (property-based)', () => {
  it('for any valid payload (all fields present, valid email format), response is 200', async () => {
    await fc.assert(
      fc.asyncProperty(validPayload, async (payload) => {
        const response = await POST(makeRequest(payload));
        expect(response.status).toBe(200);
      }),
      { numRuns: 5 },
    );
  });

  it('for any payload missing at least one field, response is 400', async () => {
    await fc.assert(
      fc.asyncProperty(partialPayload, async (payload) => {
        const response = await POST(makeRequest(payload));
        expect(response.status).toBe(400);
      }),
      { numRuns: 5 },
    );
  });

  it('for any payload with empty string values, response is 400', async () => {
    await fc.assert(
      fc.asyncProperty(emptyStringPayload, async (payload) => {
        const response = await POST(makeRequest(payload));
        expect(response.status).toBe(400);
      }),
      { numRuns: 5 },
    );
  });
});
