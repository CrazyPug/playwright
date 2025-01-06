import { test, expect, Page } from '@playwright/test';
import { logIn } from '../test-utils/utils';

test.describe('User quick money transfer', () => {
  test.beforeEach(async ({ page }) => {
    await logIn(page)
  });

  async function readBalance(page: Page) {
    const balanceInteger = await page.locator('#money_value').innerText();
    const balanceDecimals = await page.locator("#decimal_value").innerText();
    return `${balanceInteger}.${balanceDecimals}`;
  }

  test('quick transfer', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Chuck Demobankowy';
    const transferAmount = '50';
    const transferTitle = 'prezent';
    const expectTransferMessage = `Przelew wykonany! ${transferReceiver} - ${transferAmount},00PLN - prezent`
    const initialBalance = await readBalance(page)
    const expectedBalance = Number(initialBalance) - Number(transferAmount);

    // Act
    await page.locator('#widget_1_transfer_receiver').selectOption(transferReceiver);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.getByTestId('message-text')).toHaveText(expectTransferMessage)
    const finalBalance = await readBalance(page)
    await expect(finalBalance).toBe(`${expectedBalance.toFixed(2)}`);
  });

  test('phone topup', async ({ page }) => {
    //Arrange
    const topupReceiver = '500 xxx xxx';
    const topupAmount = '25';
    const expectTransferMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`
    const initialBalance = await readBalance(page)
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    //Act
    await page.locator('#widget_1_topup_receiver').selectOption(topupReceiver);
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    await page.locator('#widget_1_topup_agreement').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.getByTestId('message-text')).toHaveText(expectTransferMessage)
    const finalBalance = await readBalance(page)
    await expect(finalBalance).toBe(`${expectedBalance.toFixed(2)}`);
  });
});