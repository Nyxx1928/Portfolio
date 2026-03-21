import { test, expect } from '@playwright/test';

/**
 * Smoke tests — verify each page loads and renders its core content.
 * 
 * Note: This app uses a horizontal scroll panel layout. All panels are
 * rendered in the DOM simultaneously, so we query by text/label directly
 * without needing to navigate between routes.
 */

test.describe('Home page', () => {
  test('loads and shows hero content', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Manga Portfolio/i);
    await expect(page.getByRole('heading', { name: /welcome to my portfolio/i })).toBeVisible();

    // Buttons use aria-label, not visible text as the accessible name
    await expect(page.getByRole('button', { name: /navigate to projects page/i })).toBeAttached();
    await expect(page.getByRole('button', { name: /navigate to contact page/i })).toBeAttached();
  });

  test('"View Projects" button exists and triggers navigation', async ({ page }) => {
    await page.goto('/');
    // Button is in a horizontal scroll panel — may be off-screen, use force click
    await page.getByRole('button', { name: /navigate to projects page/i }).click({ force: true });
    // After click the projects panel should become active (URL stays at /)
    await expect(page.getByText(/Projects Archive/i)).toBeVisible({ timeout: 10_000 });
  });

  test('"Contact Me" button exists and triggers navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /navigate to contact page/i }).click({ force: true });
    await expect(page.getByText(/Get In Touch/i)).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('Projects panel', () => {
  test('shows chapter header', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Projects Archive/i)).toBeAttached();
  });

  test('shows project grid with projects', async ({ page }) => {
    await page.goto('/');
    // ProjectGrid renders with role="region" aria-label="Projects grid"
    await expect(page.getByRole('region', { name: /projects grid/i })).toBeAttached();
  });
});

test.describe('Contact panel', () => {
  test('shows chapter header', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Get In Touch/i)).toBeAttached();
  });

  test('contact form fields are present', async ({ page }) => {
    await page.goto('/');
    // Form has no aria-label — check for its fields instead
    await expect(page.getByLabel(/name/i).first()).toBeAttached();
    await expect(page.getByLabel(/email/i)).toBeAttached();
    await expect(page.getByLabel(/subject/i)).toBeAttached();
    await expect(page.getByLabel(/message/i)).toBeAttached();
  });
});

test.describe('Navigation', () => {
  test('home route returns 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('unknown route shows 404 page', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    const body = await page.textContent('body');
    expect(body?.toLowerCase()).toMatch(/not found|404/);
  });
});
