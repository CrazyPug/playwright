import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const expectedUserName = loginData.expectedUserName;

    // Act
    await new LoginPage(page).loginSuccesfully();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with short username', async ({ page }) => {
    // Arrange
    const userId = 'tester';
    const expectedTextForShortUsername = 'identyfikator ma min. 8 znaków';

    // Act
    const loginPage = new LoginPage(page)
    await loginPage.fillLogin(userId);
    await loginPage.clickPasswordInput();

    // Assert
    await loginPage.expectLoginInputError(expectedTextForShortUsername);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = '1234567';
    const expectedTextForTooShortPassword = 'hasło ma min. 8 znaków';

    // Act
    const loginPage = new LoginPage(page)
    await loginPage.fillLogin(userId)
    await loginPage.fillPassword(userPassword)
    await loginPage.leavePasswordInput()

    // Assert
    await loginPage.expectPasswordInputError(expectedTextForTooShortPassword);
  });
});