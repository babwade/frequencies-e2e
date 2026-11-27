import { BaseComponent } from '../BaseComponent';

/** Pied de page commun à toutes les pages. */
export class Footer extends BaseComponent {
  private readonly footer = this.page.getByRole('contentinfo');

  private link(name: string) {
    return this.footer.getByRole('link', { name, exact: true });
  }

  async expectLink(name: string): Promise<void> {
    await this.expectVisible(this.link(name));
  }
}
