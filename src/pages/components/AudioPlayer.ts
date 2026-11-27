import { expect } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';

const MIN_PROGRESS_SECONDS = 1;

/** Lecteur audio fixe en bas de page : l'état réel est lu sur l'élément <audio>, pas déduit de l'interface. */
export class AudioPlayer extends BaseComponent {
  private readonly audio = this.page.locator('audio');
  // Le lecteur n'a ni role ni aria-label : on l'ancre sur son élément <audio>.
  private readonly player = this.page.locator('div:has(> audio)');
  private readonly playButton = this.player.getByRole('button', {
    name: 'Lancer la lecture',
    exact: true,
  });
  private readonly pauseButton = this.player.getByRole('button', {
    name: 'Mettre en pause',
    exact: true,
  });
  private readonly nextButton = this.player.getByRole('button', {
    name: 'Passer au son suivant',
    exact: true,
  });
  private readonly progressSlider = this.player.getByRole('slider', {
    name: 'Contrôle de la progression de la piste audio',
    exact: true,
  });

  async play(): Promise<void> {
    await this.click(this.playButton);
  }

  async pause(): Promise<void> {
    await this.click(this.pauseButton);
  }

  async expectDisplayed(): Promise<void> {
    await this.expectVisible(this.player);
    await expect(this.audio).toHaveCount(1);
  }

  async expectPlayButton(): Promise<void> {
    await this.expectVisible(this.playButton);
  }

  async expectPauseButton(): Promise<void> {
    await this.expectVisible(this.pauseButton);
  }

  async expectNextButton(): Promise<void> {
    await this.expectVisible(this.nextButton);
  }

  async expectProgressSlider(): Promise<void> {
    await this.expectVisible(this.progressSlider);
  }

  async expectLoaded(): Promise<void> {
    await expect
      .poll(
        () => this.audio.evaluate((a: HTMLAudioElement) => a.readyState >= 1 && a.duration > 0),
        { message: 'Piste audio chargée (métadonnées et durée disponibles)' },
      )
      .toBe(true);
  }

  async expectPlaying(): Promise<void> {
    await expect
      .poll(() => this.audio.evaluate((a: HTMLAudioElement) => !a.paused), {
        message: 'Lecture audio en cours',
      })
      .toBe(true);
  }

  async expectPaused(): Promise<void> {
    await expect
      .poll(() => this.audio.evaluate((a: HTMLAudioElement) => a.paused), {
        message: 'Lecture audio en pause',
      })
      .toBe(true);
  }

  /** La lecture est réelle quand la position avance, pas seulement quand `paused` vaut false. */
  async expectProgressing(): Promise<void> {
    const start = await this.currentTime();
    await expect
      .poll(() => this.currentTime(), {
        message: `La position de lecture n'avance pas (départ : ${start}s)`,
      })
      .toBeGreaterThan(start + MIN_PROGRESS_SECONDS);
  }

  private currentTime(): Promise<number> {
    return this.audio.evaluate((a: HTMLAudioElement) => a.currentTime);
  }
}
