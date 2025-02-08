import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { paymentData } from '../test-data/payment.data';
import { PaymentPage } from '../pages/payment.page';

test.describe('User payments from menu', () => {
    test.beforeEach(async ({ page }) => {
        await new LoginPage(page).loginSuccesfully();
        await page.getByRole('link', { name: 'płatności' }).click();
    });

    test('successful payment with required form data', async ({ page }) => {
        // Arrange
        const userAccount = paymentData.userAccount;
        const paymentReceiver = paymentData.paymentReceiver;
        const receiverAccount = paymentData.reciverAccount;
        const amountOfPayment = paymentData.amountOfPayment;
        const titleOfPayment = paymentData.titleOfPayment;
        const userEmail = paymentData.userEmail;

        // Act
        await new PaymentPage(page).fillPaymentForm(
            userAccount,
            paymentReceiver,
            receiverAccount,
            amountOfPayment,
            titleOfPayment,
            userEmail
        )
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
        const userAccount = paymentData.userAccount;
        const paymentReceiver = '';
        const receiverAccount = paymentData.reciverAccount;
        const amountOfPayment = paymentData.amountOfPayment;
        const titleOfPayment = paymentData.titleOfPayment;
        const userEmail = paymentData.userEmail;

        // Act
        await new PaymentPage(page).fillPaymentForm(
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
        const userAccount = paymentData.userAccount;
        const paymentReceiver = paymentData.paymentReceiver;
        const receiverAccount = '';
        const amountOfPayment = paymentData.amountOfPayment;
        const titleOfPayment = paymentData.titleOfPayment;
        const userEmail = paymentData.userEmail;

        // Act
        await new PaymentPage(page).fillPaymentForm(
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
