export class UserProfile {

    constructor(page) {
        this.page = page;

        this.userCard = page.locator('div.flex-1.min-w-0').first();
        this.name = this.userCard.locator('p').first();
        this.email = this.userCard.locator('p').nth(1);
    }

    async getUserDetails() {
        // await this.userCard.waitFor({ state: 'visible' });

        const name = await this.name.textContent();
        const email = await this.email.textContent();

        return { name, email };
    }
}
