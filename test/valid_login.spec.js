import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/web/pages/loginPage';
import loginData from '../src/resources/testData/test/loginCreds.json';
import { LandingPage } from '../src/web/pages/landingPage';
import { DashboardPage } from "../src/web/pages/dashboardPage";
import { UserProfile } from "../src/web/pages/userProfilePage";


test('Valid User login test', async ({ page }, testInfo) => {
  const login = new LoginPage(page);
  const landingPage = new LandingPage(page);
  const dashboardPage = new DashboardPage(page);
  const userProfilePage = new UserProfile(page);

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

  await test.step('Open user profile', async () => {
    await dashboardPage.clickUserProfile();
  });

  await test.step('Fetch user details', async () => {
    const user = await userProfilePage.getUserDetails();

    await testInfo.attach('User Details', {
      body: JSON.stringify(user, null, 2),
      contentType: 'application/json'
    });

    console.log(user);
  });

  await test.step('Logout', async () => {
    await dashboardPage.logout();
  });

});