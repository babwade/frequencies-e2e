import { Given } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

Given('je refuse les cookies sur la bannière', async function (this: CustomWorld) {
  if (!(await this.app.cookieBanner.refuse())) this.log('Bandeau cookies absent : rien à refuser');
});

Given("j'accepte les cookies sur la bannière", async function (this: CustomWorld) {
  if (!(await this.app.cookieBanner.accept())) this.log('Bandeau cookies absent : rien à accepter');
});
