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

describe('POST /api/contact', () => {
  it('returns 200 for valid submission', async () => {
    const response = await POST(makeRequest({
      name: 'John',
      email: 'john@example.com',
      subject: 'Hello there',
      message: 'This is a test message',
    }));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ ok: true });
  });

  it('returns 400 for missing name', async () => {
    const response = await POST(makeRequest({
      email: 'john@example.com',
      subject: 'Hello there',
      message: 'This is a test message',
    }));
    expect(response.status).toBe(400);
  });

  it('returns 400 for missing email', async () => {
    const response = await POST(makeRequest({
      name: 'John',
      subject: 'Hello there',
      message: 'This is a test message',
    }));
    expect(response.status).toBe(400);
  });

  it('returns 400 for missing subject', async () => {
    const response = await POST(makeRequest({
      name: 'John',
      email: 'john@example.com',
      message: 'This is a test message',
    }));
    expect(response.status).toBe(400);
  });

  it('returns 400 for missing message', async () => {
    const response = await POST(makeRequest({
      name: 'John',
      email: 'john@example.com',
      subject: 'Hello there',
    }));
    expect(response.status).toBe(400);
  });

  it('returns 400 for empty JSON body', async () => {
    const response = await POST(makeRequest({}));
    expect(response.status).toBe(400);
  });

  it('returns 500 when RESEND_FROM is invalid', async () => {
    process.env.RESEND_FROM = 'invalid-email';
    const response = await POST(makeRequest({
      name: 'John',
      email: 'john@example.com',
      subject: 'Hello there',
      message: 'This is a test message',
    }));
    expect(response.status).toBe(500);
  });

  it('returns 500 when CONTACT_RECEIVER_EMAIL is invalid', async () => {
    process.env.CONTACT_RECEIVER_EMAIL = 'invalid-email';
    const response = await POST(makeRequest({
      name: 'John',
      email: 'john@example.com',
      subject: 'Hello there',
      message: 'This is a test message',
    }));
    expect(response.status).toBe(500);
  });

  it('returns 500 when Resend throws an error', async () => {
    // Re-mock Resend to throw for this test
    const resendMock = jest.requireMock('resend') as { Resend: jest.Mock };
    resendMock.Resend = jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockRejectedValue(new Error('API error')),
      },
    }));
    const response = await POST(makeRequest({
      name: 'John',
      email: 'john@example.com',
      subject: 'Hello there',
      message: 'This is a test message',
    }));
    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body.error).toBe('API error');
  });

  it('returns 500 when RESEND_API_KEY is not set', async () => {
    delete process.env.RESEND_API_KEY;
    const response = await POST(makeRequest({
      name: 'John',
      email: 'john@example.com',
      subject: 'Hello there',
      message: 'This is a test message',
    }));
    expect(response.status).toBe(500);
  });
});
