import { expect } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';

/** En-tête commun à toutes les pages : logo et menu principal. */
export class HeaderNav extends BaseComponent {
  private readonly mainNav = this.page
    .getByRole('navigation', { name: 'Navigation principale' })
    .filter({ visible: true });
  private readonly logo = this.page.getByRole('link', { name: "Retourner à l'accueil" });

  private menuLink(name: string) {
    return this.mainNav.getByRole('link', { name, exact: true });
  }

  // Entrée de premier niveau : lien simple ou bouton qui ouvre un sous-menu (ex. "Nos projets").
  private menuEntry(name: string) {
    return this.menuLink(name).or(this.mainNav.getByRole('button', { name, exact: true }));
  }

  async clickMenuLink(name: string): Promise<void> {
    await this.click(this.menuLink(name));
  }

  async hoverMenuEntry(name: string): Promise<void> {
    await this.hover(this.menuEntry(name));
  }

  // L'entrée de la page courante est soulignée : c'est le seul repère visuel du menu (pas d'aria-current).
  async expectActiveMenuEntry(name: string, active: boolean): Promise<void> {
    const entry = this.menuEntry(name);
    if (active) await expect(entry).toHaveCSS('text-decoration-line', 'underline');
    else await expect(entry).not.toHaveCSS('text-decoration-line', 'underline');
  }

  async expectMenuLink(name: string): Promise<void> {
    await this.expectVisible(this.menuLink(name));
  }

  async expectLogo(): Promise<void> {
    await this.expectVisible(this.logo);
  }
}
