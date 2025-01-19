import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('User logout', () => {
  test('successful logout', async ({ page }) => {
    // Act
    await new LoginPage(page).loginSuccesfully();
    await page.getByTestId('logout-button').click();

    // Assert
    await expect(page.getByTestId('login-button')).toBeVisible();
  });
});  