import { test, expect } from '@playwright/test';
import { logIn } from '../test-utils/utils';

test.describe('User logout', () => {
  test('successful logout', async ({ page }) => {
    // Act
    await logIn(page);
    await page.getByTestId('logout-button').click();

    // Assert
    await expect(page.getByTestId('login-button')).toBeVisible();
  });
});  