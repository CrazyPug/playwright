import { Locator, Page } from '@playwright/test';
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

    async clickButton() {
        return this.loginButton.click()
    }

    async loginSuccesfully() {
        await this.page.goto('/')
        await this.fillLogin(loginData.userId)
        await this.fillPassword(loginData.userPassword)
        await this.clickButton()
    }
}
