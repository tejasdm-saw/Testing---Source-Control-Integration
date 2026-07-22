import { PageElement } from '../../elements/page_element';

export class LoginPage {

    constructor(page) {
        this.page = page;

        this.emailInput = new PageElement(page, 'input[type="email"]');
        this.passwordInput = new PageElement(page, 'input[type="password"]');
        this.loginButton = new PageElement(page, 'button:text-is("Sign In")');
        this.invalidUserErrorMsg = new PageElement(page, 'text=Bad credentials');
    }


    async enterEmail(email) {
        await this.emailInput.setValue(email);
    }

    async enterPassword(password) {
        await this.passwordInput.setValue(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async login(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async isInvalidUserErrorVisible() {
        return await this.invalidUserErrorMsg.isElementVisible();
    }

    async getInvalidUserErrorText() {
        return await this.invalidUserErrorMsg.getText();
    }
}
