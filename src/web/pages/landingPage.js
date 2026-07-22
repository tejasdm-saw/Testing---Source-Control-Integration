export class LandingPage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.getByRole('button', {name: 'Sign In'});
    }

    // Navigate to Login Page
    async navigate() {
        await this.page.goto('/');
    }

    // Click Sign In
    async clickSignIn() {
        await this.signInButton.click();
    }
}