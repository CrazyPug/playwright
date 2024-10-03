import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('User money transfer', () => {
  test.beforeEach(async ({ page }) => {
    // TODO: Extract login procedure to a helper function.
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    await page.goto('/')
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });

  test('quick transfer', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Chuck Demobankowy';
    const transferAmount = '50';
    const transferTitle = 'prezent';
    const expectTransferMessage = `Przelew wykonany! ${transferReceiver} - ${transferAmount},00PLN - prezent`

    // TODO: Extract the logic fetching user's balance to a separate function.
    const initialBalanceInteger = await page.locator('#money_value').innerText();
    const initialBalanceDecimals = await page.locator("#decimal_value").innerText();
    const initialBalance = `${initialBalanceInteger}.${initialBalanceDecimals}`;
    const expectedBalance = Number(initialBalance) - Number(transferAmount);

    // Act
    await page.locator('#widget_1_transfer_receiver').selectOption(transferReceiver);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.getByTestId('message-text')).toHaveText(expectTransferMessage)
    const finalBalanceInteger = await page.locator('#money_value').innerText();
    const finalBalanceDecimals = await page.locator("#decimal_value").innerText();
    const finalBalance = `${finalBalanceInteger}.${finalBalanceDecimals}`;
    await expect(finalBalance).toBe(`${expectedBalance.toFixed(2)}`);
  });
});