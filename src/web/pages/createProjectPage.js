import {PageElement} from "../../elements/page_element";

export class CreateProjectPage {

    constructor(page) {
        this.page = page;
        this.noProjectsFound = new PageElement(page, 'p:has-text("No Projects Found")');
        // this.newProjectButton = new PageElement(page, 'button:has-text("New Project")');
        this.newProjectButton = page.getByRole('button', { name: 'New Project', exact: true });
        this.projectNameTextField = new PageElement(page,'input[placeholder="e.g. Website Redesign"]');
        this.projectDescriptionTextField = new PageElement(page,'textarea[placeholder="What is this project about?"]');
        this.processTypeDropdown = new PageElement(page, 'button:has-text("Select process type")');
        this.createProjectButton = new PageElement(page, 'button:has-text("Create Project")');
        this.projectCount = new PageElement(page, 'span.text-slate-700 span.bg-blue-600');
    }

    async waitForProjectsToLoad() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
    }

    async areProjectsPresent() {
        const isNoProjectMsgVisible = await this.noProjectsFound.locator.isVisible();
        return !isNoProjectMsgVisible;
    }

    async getProjectCount() {
        await this.projectCount.locator.waitFor({ state: 'visible', timeout: 10000 });
        const text = await this.projectCount.locator.textContent();
        const count = parseInt(text.match(/\d+/)[0]);
        return count;
    }

    async selectProcessType(value) {
        await this.processTypeDropdown.click();
        await this.page.getByRole('option', { name: value,exact: true }).click();
    }

    async createProject(name,description,processType) {
        await this.newProjectButton.click();
        await this.projectNameTextField.setValue(name);
        await this.projectDescriptionTextField.setValue(description);
        await this.selectProcessType(processType)
        await this.createProjectButton.click()
    }

}
