import { expect, type Locator, type Page, type TestInfo } from '@playwright/test';
import { IssueCollector } from '../fixtures/issue-collector';

export abstract class BasePage {
  protected readonly issues: IssueCollector;

  constructor(
    protected readonly page: Page,
    testInfo: TestInfo
  ) {
    this.issues = new IssueCollector(page, testInfo);
  }

  protected byTestId(id: string): Locator {
    return this.page.getByTestId(id).first();
  }

  protected field(name: RegExp | string): Locator {
    const pattern = typeof name === 'string' ? new RegExp(name, 'i') : name;
    return this.page.getByLabel(pattern).or(this.page.getByPlaceholder(pattern)).or(this.page.getByRole('textbox', { name: pattern })).first();
  }

  protected button(name: RegExp | string): Locator {
    const pattern = typeof name === 'string' ? new RegExp(name, 'i') : name;
    return this.page.getByRole('button', { name: pattern }).or(this.page.getByRole('link', { name: pattern })).first();
  }

  async safeClick(locator: Locator, issueTitle: string): Promise<boolean> {
    try {
      await expect(locator).toBeVisible();
      await expect(locator).toBeEnabled();
      await locator.click();
      return true;
    } catch (error) {
      await this.issues.add(issueTitle, error instanceof Error ? error.message : String(error));
      return false;
    }
  }

  async safeFill(locator: Locator, value: string, issueTitle: string): Promise<boolean> {
    try {
      await expect(locator).toBeVisible();
      const tagName = await locator.evaluate((element) => element.tagName.toLowerCase());
      if (tagName === 'select') {
        await locator.selectOption({ label: value }).catch(async () => {
          await locator.selectOption(value);
        });
        return true;
      }
      await locator.fill(value);
      return true;
    } catch (error) {
      await this.issues.add(issueTitle, error instanceof Error ? error.message : String(error));
      return false;
    }
  }

  async safeSelect(locator: Locator, valueOrLabel: string, issueTitle: string): Promise<boolean> {
    try {
      await expect(locator).toBeVisible();
      await locator.selectOption({ label: valueOrLabel }).catch(async () => {
        await locator.selectOption(valueOrLabel);
      });
      return true;
    } catch (error) {
      await this.issues.add(issueTitle, error instanceof Error ? error.message : String(error));
      return false;
    }
  }

  async expectVisible(locator: Locator, issueTitle: string): Promise<boolean> {
    try {
      await expect(locator).toBeVisible();
      return true;
    } catch (error) {
      await this.issues.add(issueTitle, error instanceof Error ? error.message : String(error));
      return false;
    }
  }
}
