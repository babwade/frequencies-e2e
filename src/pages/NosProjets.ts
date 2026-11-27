import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class NosProjetsPage extends BasePage {
  readonly name = 'Nos-projets';
  readonly path = '/fictions-sonores';

  async expectTabTitle(title: string): Promise<void> {
    await expect
      .poll(() => this.page.title(), { message: `Titre de l'onglet de la page "${this.name}"` })
      .toBe(title);
  }
}
