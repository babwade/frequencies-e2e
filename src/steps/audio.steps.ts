import { Then, When } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

When('je lance la lecture audio', async function (this: CustomWorld) {
  await this.app.audioPlayer.play();
});

When('je mets la lecture audio en pause', async function (this: CustomWorld) {
  await this.app.audioPlayer.pause();
});

Then('le lecteur audio est visible', async function (this: CustomWorld) {
  await this.app.audioPlayer.expectDisplayed();
});

Then('le lecteur audio est chargé', async function (this: CustomWorld) {
  await this.app.audioPlayer.expectLoaded();
});

Then('le lecteur audio affiche le bouton de lecture', async function (this: CustomWorld) {
  await this.app.audioPlayer.expectPlayButton();
});

Then('le lecteur audio affiche le bouton de pause', async function (this: CustomWorld) {
  await this.app.audioPlayer.expectPauseButton();
});

Then('le lecteur audio affiche le bouton de piste suivante', async function (this: CustomWorld) {
  await this.app.audioPlayer.expectNextButton();
});

Then('le lecteur audio affiche le curseur de progression', async function (this: CustomWorld) {
  await this.app.audioPlayer.expectProgressSlider();
});

Then('la lecture audio est en cours', async function (this: CustomWorld) {
  await this.app.audioPlayer.expectPlaying();
});

Then('la lecture audio est en pause', async function (this: CustomWorld) {
  await this.app.audioPlayer.expectPaused();
});

Then('la progression de la lecture audio avance', async function (this: CustomWorld) {
  await this.app.audioPlayer.expectProgressing();
});
