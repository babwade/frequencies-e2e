import { expect } from '@playwright/test';
import type { Locator, Page } from 'playwright';

/**
 * Socle des pages et des composants : actions et vérifications génériques sur un Locator.
 * Les locators eux-mêmes sont déclarés dans les classes filles ; les steps n'y touchent jamais.
 */
export abstract class BaseComponent {
  constructor(protected readonly page: Page) {}

  // SPA : "networkidle" n'est jamais atteint (flux audio, GTM). On attend le contenu et le titre.
  protected async waitForAppReady(): Promise<void> {
    await this.page.getByRole('main').waitFor({ state: 'visible' });
    await this.page.waitForFunction(() => document.title.trim().length > 0);
  }

  protected async click(target: Locator): Promise<void> {
    await target.click();
  }

  protected async hover(target: Locator): Promise<void> {
    await target.hover();
  }

  protected async fill(target: Locator, value: string): Promise<void> {
    await target.fill(value);
  }

  protected async setChecked(target: Locator, checked: boolean): Promise<void> {
    await target.setChecked(checked);
  }

  protected async expectVisible(target: Locator): Promise<void> {
    await expect(target).toBeVisible();
  }

  protected async expectHidden(target: Locator): Promise<void> {
    await expect(target).toBeHidden();
  }

  protected async expectEnabled(target: Locator): Promise<void> {
    await expect(target).toBeEnabled();
  }

  protected async expectDisabled(target: Locator): Promise<void> {
    await expect(target).toBeDisabled();
  }

  protected async expectChecked(target: Locator, checked: boolean): Promise<void> {
    await expect(target).toBeChecked({ checked });
  }

  protected async expectValue(target: Locator, value: string): Promise<void> {
    await expect(target).toHaveValue(value);
  }

  protected async expectText(target: Locator, text: string): Promise<void> {
    await expect(target).toContainText(text);
  }

  protected async expectAttribute(
    target: Locator,
    attribute: string,
    value: string,
  ): Promise<void> {
    await expect(target).toHaveAttribute(attribute, value);
  }
}
