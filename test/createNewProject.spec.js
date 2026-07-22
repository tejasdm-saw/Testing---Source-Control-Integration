import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/web/pages/loginPage';
import loginData from '../src/resources/testData/test/loginCreds.json';
import { LandingPage } from '../src/web/pages/landingPage';
import { DashboardPage } from "../src/web/pages/dashboardPage";
import {CreateProjectPage} from "../src/web/pages/createProjectPage";
import {CommonConstants} from "../src/constants/ui_constants";


test('Validate Project Listing and Project Creation test', async ({ page }, testInfo) => {
    const login = new LoginPage(page);
    const landingPage = new LandingPage(page);
    const dashboardPage = new DashboardPage(page);
    const createProjectPage = new CreateProjectPage(page);
    const { PROJECT_NAME, PROJECT_DESCRIPTION, PROCESS_TYPE } =
        CommonConstants.CreateProjectData;

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

    await test.step('Click Projects Button', async () => {
        await dashboardPage.projectMenu.click();
    });

    await test.step('Create New Project', async () => {
        await createProjectPage.waitForProjectsToLoad();
        const projectsExist = await createProjectPage.areProjectsPresent();
        if (projectsExist) {
            console.log("Project (s) exists");
            const projectCount = await createProjectPage.getProjectCount();
            console.log(`Project Count: ${projectCount}`);

        } else {
            console.log("No projects found");
        }

        await createProjectPage.createProject(
            PROJECT_NAME,
            PROJECT_DESCRIPTION,
            PROCESS_TYPE
        );
    });

    await test.step('Logout', async () => {
        await dashboardPage.logout();
    });
});