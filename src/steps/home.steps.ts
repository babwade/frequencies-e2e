import { Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

Then(
  "la page d'accueil affiche le titre {string}",
  async function (this: CustomWorld, title: string) {
    await this.app.home.expectHeading(title);
  },
);
