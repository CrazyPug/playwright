import { test, expect, Page } from '@playwright/test';
import { logIn } from '../test-utils/utils';

test.describe('User payments (from menu)', () => {
    test.beforeEach(async ({ page }) => {
        await logIn(page);
        await page.getByRole('link', { name: 'płatności' }).click();
    })

    async function fillPaymentForm(
        page: Page,
        userAccount: string,
        paymentReceiver: string,
        receiverAccount: string,
        amountOfPayment: string,
        titleOfPayment: string,
        userEmail: string
    ) {
        await page.locator('#form_account_from').selectOption(userAccount);
        await page.getByTestId('transfer_receiver').fill(paymentReceiver);
        await page.getByTestId('form_account_to').fill(receiverAccount);
        await page.getByTestId('form_amount').fill(amountOfPayment);
        await page.getByTestId('form_title').fill(titleOfPayment);
        await page.getByLabel('ekspresowy').click();
        await page.locator('#uniform-form_is_email span').click();
        await page.locator('#form_email').fill(userEmail);
        await page.locator('#uniform-form_add_receiver span').click();
    }

    test('successful payment with required form data', async ({ page }) => {
        // Arrange
        const userAccount = '[KO] konto na życie [13 159,20 PLN] 4141...0000';
        const paymentReceiver = 'Anna Kowalska';
        const reciverAccount = '34 5676 6767 6769 8798 7897 9878';
        const amountOfPayment = '350';
        const titleOfPayment = 'na prezent';
        const userEmail = 'jan.demobankowy@gmail.com';

        // Act
        await fillPaymentForm(
            page,
            userAccount,
            paymentReceiver,
            reciverAccount,
            amountOfPayment,
            titleOfPayment,
            userEmail
        );
        await page.getByRole('button', { name: 'wykonaj przelew' }).click();

        // Assert
        const successModal = page.getByRole('paragraph');
        await expect(successModal).toContainText('Przelew wykonany!');
        await expect(successModal).toContainText(`Odbiorca: ${paymentReceiver}`);
        await expect(successModal).toContainText(`Kwota: ${amountOfPayment}`);
        await expect(successModal).toContainText(`Nazwa: ${titleOfPayment}`);
    });

    test('unsuccessful payment with missing receiver', async ({ page }) => {
        // Arrange
        const userAccount = '[KO] konto na życie [13 159,20 PLN] 4141...0000';
        const paymentReceiver = '';
        const receiverAccount = '34 5676 6767 6769 8798 7897 9878';
        const amountOfPayment = '350';
        const titleOfPayment = 'na prezent';
        const userEmail = 'jan.demobankowy@gmail.com';

        // Act
        await fillPaymentForm(
            page,
            userAccount,
            paymentReceiver,
            receiverAccount,
            amountOfPayment,
            titleOfPayment,
            userEmail
        );

        // Assert
        await expect(page.getByTestId('error-widget-4-transfer-receiver'))
            .toContainText('pole wymagane');
    });

    test('unsuccessful payment with missing receiver account', async ({ page }) => {
        // Arrange
        const userAccount = '[KO] konto na życie [13 159,20 PLN] 4141...0000';
        const paymentReceiver = 'Anna Kowalska';
        const receiverAccount = '';
        const amountOfPayment = '350';
        const titleOfPayment = 'na prezent';
        const userEmail = 'jan.demobankowy@gmail.com';

        // Act
        await fillPaymentForm(
            page,
            userAccount,
            paymentReceiver,
            receiverAccount,
            amountOfPayment,
            titleOfPayment,
            userEmail
        );

        // Assert
        await expect(page.getByTestId('error-widget-2-transfer-account'))
            .toContainText('pole wymagane');
    });
});