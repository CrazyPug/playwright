import { Locator, Page, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

export class LoginPage {

    private loginInput: Locator
    private passwordInput: Locator
    private loginButton: Locator

    constructor(private page: Page) {
        this.loginInput = this.page.getByTestId('login-input')
        this.passwordInput = this.page.getByTestId('password-input')
        this.loginButton = this.page.getByTestId('login-button')
    }

    async fillLogin(login: string) {
        return this.loginInput.fill(login)
    }

    async fillPassword(password: string) {
        return this.passwordInput.fill(password)
    }

    async clickPasswordInput(){
         return this.passwordInput.click()
    }

    async leavePasswordInput() {
        return this.passwordInput.blur()
    }

    async clickSubmit() {
        return this.loginButton.click()
    }
    
    async loginSuccesfully() {
        await this.page.goto('/')
        await this.fillLogin(loginData.userId)
        await this.fillPassword(loginData.userPassword)
        await this.clickSubmit()
    }

    async expectLoginInputError(error: string) {
        return expect(this.page.getByTestId('error-login-id')).toHaveText(error);
    }

    async expectPasswordInputError(error: string) {
        return expect(this.page.getByTestId('error-login-password')).toHaveText(error);
    }
}
