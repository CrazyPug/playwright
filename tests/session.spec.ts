import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('session time', () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).loginSuccesfully()
  });

  async function getSessionLeftMinutes(page: Page) {
    return await page.locator('#countdown_minutes').innerText();
  };

  async function getSessionLeftSeconds(page: Page) {
    return await page.locator('#countdown_seconds').innerText();
  };

  async function getSessionLeft(page: Page) {
    const minutes = await getSessionLeftMinutes(page)
    const seconds = await getSessionLeftSeconds(page)
    return `${minutes}:${seconds}`
  };

  test('10 minutes session after login', async ({ page }) => {
    const timeout = await getSessionLeft(page)
    await expect(timeout).toBe('10:00')
  });

  test('session time counts down', async ({ page }) => {
    await page.waitForTimeout(1500)
    const timeAfter = await getSessionLeft(page)
    await expect(timeAfter).toBe('09:59')
  });
});