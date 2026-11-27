import { Given, Then, When } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

Given('je suis sur la page {string}', async function (this: CustomWorld, name: string) {
  await this.app.page(name).open();
});

When('je navigue vers la page {string}', async function (this: CustomWorld, name: string) {
  await this.app.page(name).open();
});

When('je recharge la page', async function (this: CustomWorld) {
  await this.app.navigation.reload();
});

When('je reviens à la page précédente', async function (this: CustomWorld) {
  await this.app.navigation.goBack();
});

When('je vais à la page suivante', async function (this: CustomWorld) {
  await this.app.navigation.goForward();
});

Then('je me trouve sur la page {string}', async function (this: CustomWorld, name: string) {
  await this.app.page(name).expectCurrent();
});

Then("l'URL contient {string}", async function (this: CustomWorld, fragment: string) {
  await this.app.navigation.expectUrlContains(fragment);
});

Then('le titre de la page est {string}', async function (this: CustomWorld, title: string) {
  await this.app.navigation.expectTitle(title, true);
});

Then('le titre de la page contient {string}', async function (this: CustomWorld, title: string) {
  await this.app.navigation.expectTitle(title, false);
});
