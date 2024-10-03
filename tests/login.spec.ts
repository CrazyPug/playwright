import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('User login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = loginData.expectedUserName;

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with short username', async ({ page }) => {
    // Arrange
    const userId = 'tester';
    const expectedTextForShortUsername = 'identyfikator ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').click();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(expectedTextForShortUsername);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = '1234567';
    const expectedTextForTooShortPassword = 'hasło ma min. 8 znaków';

    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(expectedTextForTooShortPassword);
  });
});