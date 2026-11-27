import { Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

Then('le pied de page propose le lien {string}', async function (this: CustomWorld, name: string) {
  await this.app.footer.expectLink(name);
});
