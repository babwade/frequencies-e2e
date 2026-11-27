import { Then, When } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

When(
  'je clique sur le lien {string} du menu principal',
  async function (this: CustomWorld, name: string) {
    await this.app.header.clickMenuLink(name);
  },
);

Then(
  'le menu principal propose le lien {string}',
  async function (this: CustomWorld, name: string) {
    await this.app.header.expectMenuLink(name);
  },
);

When(
  "je survole l'entrée {string} du menu principal",
  async function (this: CustomWorld, name: string) {
    await this.app.header.hoverMenuEntry(name);
  },
);

Then(
  'le menu principal met en évidence {string}',
  async function (this: CustomWorld, name: string) {
    await this.app.header.expectActiveMenuEntry(name, true);
  },
);

Then(
  'le menu principal ne met pas en évidence {string}',
  async function (this: CustomWorld, name: string) {
    await this.app.header.expectActiveMenuEntry(name, false);
  },
);

Then('le logo du site est affiché', async function (this: CustomWorld) {
  await this.app.header.expectLogo();
});
