import { expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

/** Navigation du navigateur et contrôles qui ne dépendent d'aucune page en particulier. */
export class PageNavigation extends BaseComponent {
  async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.waitForAppReady();
  }

  async goBack(): Promise<void> {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
    await this.waitForAppReady();
  }

  async goForward(): Promise<void> {
    await this.page.goForward({ waitUntil: 'domcontentloaded' });
    await this.waitForAppReady();
  }

  async expectUrlContains(fragment: string): Promise<void> {
    await expect
      .poll(() => this.page.url(), { message: `URL attendue contenant "${fragment}"` })
      .toContain(fragment);
  }

  async expectTitle(title: string, exact: boolean): Promise<void> {
    const poll = expect.poll(() => this.page.title(), { message: 'Titre de la page' });
    if (exact) await poll.toBe(title);
    else await poll.toContain(title);
  }
}
