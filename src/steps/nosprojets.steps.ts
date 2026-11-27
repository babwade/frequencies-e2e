import { Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

Then(
  'la page de nosprojets affiche le titre {string}',
  async function (this: CustomWorld, title: string) {
    await this.app.nosprojets.expectTabTitle(title);
  },
);
