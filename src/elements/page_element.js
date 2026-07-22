import { test, expect } from '@playwright/test';
import { Timeout } from '../constants/timeout';

export class PageElement {

    constructor(page, selector) {
        this.page = page;
        this.selector = selector;
        this.locator = page.locator(selector);
    }

    async click(timeout = Timeout.WAIT_TIMEOUT) {
        try {
            await test.step(`Click on element: ${this.selector}`, async () => {
                await this.waitForElementToBeClickable(timeout);
                await this.locator.click();
            });
        } catch (e) {
            console.error(`Failed to click element: ${this.selector}`, e);
            throw e;
        }
    }

    async scrollAndClick(timeout = Timeout.WAIT_TIMEOUT) {
        try {
            await test.step(`Scroll and click on element: ${this.selector}`, async () => {
            await this.locator.scrollIntoViewIfNeeded();
            await this.locator.click({ timeout });
        });
    } catch (e) {
        console.error(`Scroll and click failed: ${this.selector}`, e);
        throw e;
    }
}

    async setValue(value, { timeout = Timeout.WAIT_TIMEOUT } = {}) {
        try {
            await test.step(`Set value "${value}" on element: ${this.selector}`, async () => {
                await this.waitForVisibilityOfElement(timeout);
                await this.locator.fill(value);
            });
        } catch (e) {
            console.error(`Failed to set value on ${this.selector}`, e);
            throw e;
        }
    }

    async clear() {
        try {
            await test.step(`Clear value on element: ${this.selector}`, async () => {
                await this.locator.fill('');
            });
        } catch (e) {
            console.error(`Failed to clear element ${this.selector}`, e);
            throw e;
        }
    }

    async getText(timeout = Timeout.WAIT_TIMEOUT) {
        try {
            return await test.step(`Get text from element: ${this.selector}`, async () => {
                await this.waitForVisibilityOfElement(timeout);
                return await this.locator.textContent();
            });
        } catch (e) {
            console.error(`Failed to get text from ${this.selector}`, e);
            return null;
        }
    }

    async getAttributeValue(attributeName) {
        try {
            return await test.step(
                `Get attribute "${attributeName}" from ${this.selector}`,
                async () => {
                    return await this.locator.getAttribute(attributeName);
                }
            );
        } catch (e) {
            console.error(`Failed to get attribute ${attributeName}`, e);
            return null;
        }
    }

    async isElementVisible(timeout = Timeout.WAIT_TIMEOUT) {
        try {
            return await test.step(
                `Check visibility of element: ${this.selector}`,
                async () => {
                    await this.locator.waitFor({ state: 'visible', timeout });
                    return await this.locator.isVisible();
                }
            );
        } catch {
            return false;
        }
    }

    async isElementClickable(timeout = Timeout.WAIT_TIMEOUT) {
        try {
            return await test.step(
                `Check clickable state of element: ${this.selector}`,
                async () => {
                    await this.locator.waitFor({ state: 'visible', timeout });
                    await expect(this.locator).toBeEnabled({ timeout });
                    return true;
                }
            );
        } catch {
            return false;
        }
    }

    async isElementEnabled(timeout = Timeout.WAIT_TIMEOUT) {
        try {
            return await test.step(
                `Check enabled state of element: ${this.selector}`,
                async () => {
                    await expect(this.locator).toBeEnabled({ timeout });
                    return true;
                }
            );
        } catch {
            return false;
        }
    }

    async waitForVisibilityOfElement(timeout = Timeout.WAIT_TIMEOUT) {
        await test.step(
            `Wait for element to be visible: ${this.selector}`,
            async () => {
                await this.locator.waitFor({
                    state: 'visible',
                    timeout
                });
            }
        );
    }

    async waitForElementToBeClickable(timeout = Timeout.WAIT_TIMEOUT) {
        await test.step(
            `Wait for element to be clickable: ${this.selector}`,
            async () => {
                await this.locator.waitFor({ state: 'visible', timeout });
                await expect(this.locator).toBeEnabled({ timeout });
            }
        );
    }

    async waitForElementToDisappear(timeout = Timeout.WAIT_TIMEOUT) {
        await test.step(
            `Wait for element to disappear: ${this.selector}`,
            async () => {
                await this.locator.waitFor({
                    state: 'hidden',
                    timeout
                });
            }
        );
    }

    async waitForElementToAppear(timeout = Timeout.WAIT_TIMEOUT) {
        await test.step(
            `Wait for element to appear: ${this.selector}`,
            async () => {
                await this.locator.waitFor({
                    state: 'visible',
                    timeout
                });
            }
        );
    }
}