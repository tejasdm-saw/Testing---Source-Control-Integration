import {PageElement} from "../../elements/page_element";

export class DashboardPage {

    constructor(page) {
        this.page = page;

        this.profileIcon = page.locator('button[aria-haspopup="menu"]').nth(1);
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.projectMenu = page.getByRole('button',{name:'Projects'});
        this.acceptAnnouncementPopUpBtn = new PageElement(page, 'button:has-text("Got it")');
        this.cancelAnnouncementPopUp = new PageElement(page, 'button[aria-label="Close"]');
        this.dashboardMenu = page.getByRole('button',{name:'Dashboard'});
        this.membersMenu = page.getByRole('button',{name:'Members'});
        this.configurationMenu = page.getByRole('button',{name:'Configurations'});
        this.billingMenu = page.getByRole('button',{name:'Billing'});
        this.activeProjectsCount = page.locator("//p[normalize-space()='Active Projects']/following-sibling::h4");
        this.ThisMonthActiveProjects = page.locator("//p[contains(.,'new this month')]/strong");
        this.OpenWorkItemsCount = page.locator("//p[normalize-space()='Open Work Items']/following-sibling::h4");
        this.OpenWorkItemsLastWeekCount = page.locator("//p[contains(.,'from last week')]/strong");
        this.ActiveSprintsCount = page.locator("//p[normalize-space()='Active Sprints']/following-sibling::h4");
        this.ActiveTeamMembersCount = page.locator("//p[normalize-space()='Active Team Members']/following-sibling::h4");
        this.TeamMembersJoinedThisMonthCount = page.locator("//p[contains(.,'joined this month')]/strong");
        this.CriticalBugsCount = page.locator("//p[normalize-space()='Critical Bugs']/following-sibling::h4");
        this.CriticalBugsClosedTodayCount = page.locator("//p[contains(.,'closed today')]/strong");
    }

    async clickUserProfile() {
        await this.profileIcon.click();
    }

    async clickCancelAnnouncementPopUp() {
        // await this.cancelAnnouncementPopUp.click();
        await this.acceptAnnouncementPopUpBtn.click();
    }

    async logout() {
        const expanded = await this.profileIcon.getAttribute('aria-expanded');
        if (expanded === 'false') {
            await this.profileIcon.click();
        }
        await this.logoutButton.waitFor({ state: 'visible' });
        await this.logoutButton.click();
    }

    async getActiveProjectsCount() {
        const count = await this.activeProjectsCount.textContent();
        return parseInt(count.trim(), 10);
    }

    async getActiveProjectsThisMonth() {
        const count = await this.ThisMonthActiveProjects.textContent();
        return parseInt(count.trim(), 10);
    }

    async getOpenWorkItems() {
        const count = await this.OpenWorkItemsCount.textContent();
        return parseInt(count.trim(), 10);
    }

    async getOpenWorkItemsFromLastWeek() {
        const count = await this.OpenWorkItemsLastWeekCount.textContent();
        return parseInt(count.trim(), 10);
    }

    async getActiveSprints() {
        const count = await this.ActiveSprintsCount.textContent();
        return parseInt(count.trim(), 10);
    }

    async getActiveTeamMembers() {
        const count = await this.ActiveTeamMembersCount.textContent();
        return parseInt(count.trim(), 10);
    }

    async getTeamMembersJoinedThisMonth() {
        const count = await this.TeamMembersJoinedThisMonthCount.textContent();
        return parseInt(count.trim(), 10);
    }

    async getCriticalBugs() {
        const count = await this.CriticalBugsCount.textContent();
        return parseInt(count.trim(), 10);
    }

    async getCriticalBugsClosedToday() {
        const count = await this.CriticalBugsClosedTodayCount.textContent();
        return parseInt(count.trim(), 10);
    }

}
