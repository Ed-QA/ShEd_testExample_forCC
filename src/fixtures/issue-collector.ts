import { expect, type Page, type TestInfo } from '@playwright/test';

export class IssueCollector {
  private readonly issues: string[] = [];

  constructor(
    private readonly page: Page,
    private readonly testInfo: TestInfo
  ) {}

  async add(title: string, details?: string): Promise<void> {
    const message = details ? `${title}: ${details}` : title;
    this.issues.push(message);

    expect.soft(false, message).toBeTruthy();
  }

  hasIssues(): boolean {
    return this.issues.length > 0;
  }

  all(): string[] {
    return [...this.issues];
  }
}
