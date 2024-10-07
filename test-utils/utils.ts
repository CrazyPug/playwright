import { Page } from '@playwright/test';
import { loginData } from '../test-data/login.data';

export async function logIn(page: Page) {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    await page.goto('/')
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
}