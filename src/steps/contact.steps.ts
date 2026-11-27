import { Then, When } from '@cucumber/cucumber';
import type { ContactField } from '../pages/ContactPage';
import type { CustomWorld } from '../support/world';

const FIELD = '(nom|e-mail|message)';

When(
  new RegExp(`^je saisis "([^"]*)" dans le champ ${FIELD}$`),
  async function (this: CustomWorld, value: string, field: ContactField) {
    await this.app.contact.fillField(field, value);
  },
);

When(/^je (coche|décoche) le consentement$/, async function (this: CustomWorld, action: string) {
  await this.app.contact.setConsent(action === 'coche');
});

Then(
  'la page de contact affiche le titre {string}',
  async function (this: CustomWorld, title: string) {
    await this.app.contact.expectHeading(title);
  },
);

Then(
  new RegExp(`^le champ ${FIELD} est affiché$`),
  async function (this: CustomWorld, field: ContactField) {
    await this.app.contact.expectFieldDisplayed(field);
  },
);

Then(
  new RegExp(`^le champ ${FIELD} contient "([^"]*)"$`),
  async function (this: CustomWorld, field: ContactField, value: string) {
    await this.app.contact.expectFieldValue(field, value);
  },
);

Then(
  new RegExp(`^le champ ${FIELD} a l'attribut "([^"]*)" égal à "([^"]*)"$`),
  async function (this: CustomWorld, field: ContactField, attribute: string, value: string) {
    await this.app.contact.expectFieldAttribute(field, attribute, value);
  },
);

Then('le consentement est affiché', async function (this: CustomWorld) {
  await this.app.contact.expectConsentDisplayed();
});

Then(/^le consentement est (coché|décoché)$/, async function (this: CustomWorld, state: string) {
  await this.app.contact.expectConsentChecked(state === 'coché');
});

Then("le bouton d'envoi est affiché", async function (this: CustomWorld) {
  await this.app.contact.expectSubmitDisplayed();
});

Then("le bouton d'envoi est désactivé", async function (this: CustomWorld) {
  await this.app.contact.expectSubmitDisabled();
});
