import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/web/pages/loginPage';
import loginData from '../src/resources/testData/test/loginCreds.json';
import { LandingPage } from '../src/web/pages/landingPage';
import { DashboardPage } from "../src/web/pages/dashboardPage";


test('Validate Dashboard Data', async ({ page }, testInfo) => {
    const login = new LoginPage(page);
    const landingPage = new LandingPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate to landing page', async () => {
        await landingPage.navigate();
    });

    await test.step('Click Sign In button', async () => {
        await landingPage.clickSignIn();
    });

    await test.step('Login with valid credentials', async () => {
        await login.login(
            loginData.validUser.orgAdminUser,
            loginData.validUser.orgAdminPassword
        );
    });

    await dashboardPage.clickCancelAnnouncementPopUp();
    const activeProjects = await dashboardPage.getActiveProjectsCount();
    console.log(`Active Project (s) : ${activeProjects}`);
    const activeProjectsThisMonth = await dashboardPage.getActiveProjectsThisMonth();
    console.log(`Active Projects New in this Month : ${activeProjectsThisMonth}`);
    const openWorkItems = await dashboardPage.getOpenWorkItems();
    console.log(`Open Work Items : ${openWorkItems}`);
    const openWorkItemsFromLastWeek = await dashboardPage.getOpenWorkItemsFromLastWeek();
    console.log(`Open Work Items From Last Week : ${openWorkItemsFromLastWeek}`);
    const activeSprints = await dashboardPage.getActiveSprints();
    console.log(`Active Sprints : ${activeSprints}`);
    const activeTeamMembers = await dashboardPage.getActiveTeamMembers();
    console.log(`Active Team Members : ${activeTeamMembers}`);
    const teamMembersJoinedThisMonth = await dashboardPage.getTeamMembersJoinedThisMonth();
    console.log(`Team Members Joined Today : ${teamMembersJoinedThisMonth}`);
    const criticalBugs = await dashboardPage.getCriticalBugs();
    console.log(`Critical Bugs: ${criticalBugs}`);
    const criticalBugsClosedToday = await dashboardPage.getCriticalBugsClosedToday();
    console.log(`Critical Bugs Closed Today : ${criticalBugsClosedToday}`);

    await test.step('Logout', async () => {
        await dashboardPage.logout();
    });
});