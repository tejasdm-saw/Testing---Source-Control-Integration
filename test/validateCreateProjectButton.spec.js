import {test, expect} from "@playwright/test";
import { LoginPage } from '../src/web/pages/loginPage';
import loginData from '../src/resources/testData/test/loginCreds.json';
import {LandingPage} from '../src/web/pages/landingPage';
import {DashboardPage} from "../src/web/pages/dashboardPage";


test('Validate create project button test', async ({ page }) => {
    const login = new LoginPage(page);
    const landingPage = new LandingPage(page);
    const dashboardPage = new DashboardPage(page);

    await landingPage.navigate();
    await landingPage.clickSignIn();
    await login.login(loginData.validUser.orgAdminUser, loginData.validUser.orgAdminPassword);
    await dashboardPage.logout();
    await login.login(loginData.validUser.orgAdminUser, loginData.validUser.orgAdminPassword);
    await dashboardPage.logout();
});