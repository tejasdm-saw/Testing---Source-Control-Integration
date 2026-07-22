// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/web/pages/loginPage';
import loginData from '../src/resources/testData/test/loginCreds.json';
import {LandingPage} from '../src/web/pages/landingPage';


test('Invalid User login test', async ({ page }) => {
    const login = new LoginPage(page);
    const landingPage = new LandingPage(page);

    await landingPage.navigate();
    await landingPage.clickSignIn();
    await login.login(loginData.invalidUser.orgAdminUser,loginData.invalidUser.orgAdminPassword);
    const errorMsg = await login.invalidUserErrorMsg.textContent();
    console.log(errorMsg);
    expect(errorMsg).toContain('Bad credentials');

});
