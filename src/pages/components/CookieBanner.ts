import type { Locator } from 'playwright';
import { BaseComponent } from '../BaseComponent';

const APPEARANCE_TIMEOUT_MS = 5_000;

/** Bandeau de consentement CookieFirst : fixe en bas de page, il recouvre le lecteur audio. */
export class CookieBanner extends BaseComponent {
  private readonly banner = this.page.getByTestId('banner');
  private readonly refuseButton = this.page.getByTestId('actionButton-reject');
  private readonly acceptButton = this.page.getByTestId('actionButton-accept');

  refuse(): Promise<boolean> {
    return this.answer(this.refuseButton);
  }

  accept(): Promise<boolean> {
    return this.answer(this.acceptButton);
  }

  /** Le bandeau s'affiche après le chargement. Retourne false s'il n'apparaît pas (consentement déjà donné). */
  private async answer(button: Locator): Promise<boolean> {
    const shown = await button.waitFor({ state: 'visible', timeout: APPEARANCE_TIMEOUT_MS }).then(
      () => true,
      () => false,
    );
    if (!shown) return false;
    await this.click(button);
    await this.expectHidden(this.banner);
    return true;
  }
}
