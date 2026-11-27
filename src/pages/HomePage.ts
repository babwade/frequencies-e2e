import { BasePage } from './BasePage';

/** Page d'accueil ("/"). */
export class HomePage extends BasePage {
  readonly name = 'Accueil';
  readonly path = '/';

  private heading(name: string) {
    return this.page.getByRole('heading', { name, exact: true }).filter({ visible: true });
  }

  async expectHeading(name: string): Promise<void> {
    await this.expectVisible(this.heading(name));
  }
}
