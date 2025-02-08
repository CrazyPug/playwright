import { Locator, Page, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

export class LoginPage {
    loginInput: Locator
    passwordInput: Locator
    loginButton: Locator

    constructor(private page: Page) {
        this.loginInput = this.page.getByTestId('login-input')
        this.passwordInput = this.page.getByTestId('password-input')
        this.loginButton = this.page.getByTestId('login-button')
    }

    async loginSuccesfully() {
        await this.page.goto('/')
        await this.loginInput.fill(loginData.userId);
        await this.passwordInput.fill(loginData.userPassword)
        await this.loginButton.click();
    }
}
