import { Locator, Page } from "@playwright/test";
import { paymentData } from "../test-data/payment.data";

export class PaymentPage {
    userAccount: Locator
    paymentReceiver: Locator
    receiverAccount: Locator
    amountOfPayment: Locator
    titleOfPayment: Locator
    userEmail: Locator
    checkboxEmail: Locator
    checkboxListOfReceiver: Locator

    constructor(private page: Page) {
        this.userAccount = this.page.locator('#form_account_from')
        this.paymentReceiver = this.page.getByTestId('transfer_receiver')
        this.receiverAccount = this.page.getByTestId('form_account_to')
        this.amountOfPayment = this.page.getByTestId('form_amount')
        this.titleOfPayment = this.page.getByTestId('form_title')
        this.userEmail = this.page.locator('#form_email')
        this.checkboxEmail = this.page.locator('#uniform-form_is_email span')
        this.checkboxListOfReceiver = this.page.locator('#uniform-form_add_receiver span')
    }

    async fillPaymentForm(
        userAccount: string,
        paymentReceiver: string,
        receiverAccount: string,
        amountOfPayment: string,
        titleOfPayment: string,
        userEmail: string
    ) {
        await this.userAccount.selectOption(userAccount);
        await this.paymentReceiver.fill(paymentReceiver);
        await this.receiverAccount.fill(receiverAccount);
        await this.amountOfPayment.fill(amountOfPayment);
        await this.titleOfPayment.fill(titleOfPayment);
        await this.checkboxEmail.click();
        await this.userEmail.fill(userEmail);
        await this.checkboxListOfReceiver.click();

    }
}