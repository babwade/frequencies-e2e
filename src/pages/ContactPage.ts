import type { Locator } from 'playwright';
import { BasePage } from './BasePage';

export type ContactField = 'nom' | 'e-mail' | 'message';

/** Page de contact ("/contact"). Le bouton d'envoi reste désactivé en automatisation (anti-robot). */
export class ContactPage extends BasePage {
  readonly name = 'Contact';
  readonly path = '/contact';

  private readonly nameInput = this.page.getByLabel('Nom et prénom*', { exact: true });
  private readonly emailInput = this.page.getByLabel('E-mail *', { exact: true });
  private readonly messageInput = this.page.getByLabel('Votre message *', { exact: true });
  private readonly consentCheckbox = this.page.getByRole('checkbox', {
    name: /informations fournies/,
  });
  private readonly submitButton = this.page.getByRole('button', {
    name: 'Envoyer le message',
    exact: true,
  });

  private input(field: ContactField): Locator {
    const inputs: Record<ContactField, Locator> = {
      nom: this.nameInput,
      'e-mail': this.emailInput,
      message: this.messageInput,
    };
    return inputs[field];
  }

  private heading(name: string) {
    return this.page.getByRole('heading', { name, exact: true }).filter({ visible: true });
  }

  // --- Actions ---

  async fillField(field: ContactField, value: string): Promise<void> {
    await this.fill(this.input(field), value);
  }

  async setConsent(checked: boolean): Promise<void> {
    await this.setChecked(this.consentCheckbox, checked);
  }

  // --- Vérifications ---

  async expectHeading(name: string): Promise<void> {
    await this.expectVisible(this.heading(name));
  }

  async expectFieldDisplayed(field: ContactField): Promise<void> {
    await this.expectVisible(this.input(field));
  }

  async expectFieldValue(field: ContactField, value: string): Promise<void> {
    await this.expectValue(this.input(field), value);
  }

  async expectFieldAttribute(field: ContactField, attribute: string, value: string): Promise<void> {
    await this.expectAttribute(this.input(field), attribute, value);
  }

  async expectConsentDisplayed(): Promise<void> {
    await this.expectVisible(this.consentCheckbox);
  }

  async expectConsentChecked(checked: boolean): Promise<void> {
    await this.expectChecked(this.consentCheckbox, checked);
  }

  async expectSubmitDisplayed(): Promise<void> {
    await this.expectVisible(this.submitButton);
  }

  async expectSubmitDisabled(): Promise<void> {
    await this.expectDisabled(this.submitButton);
  }
}
