import { expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

/** Toute page du site doit avoir sa classe qui étend celle-ci : un nom fonctionnel et un chemin. */
export abstract class BasePage extends BaseComponent {
  abstract readonly name: string;
  abstract readonly path: string;

  async open(): Promise<void> {
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
    await this.waitForAppReady();
  }

  async expectCurrent(): Promise<void> {
    await expect
      .poll(() => this.currentPath(), { message: `Page attendue : "${this.name}" (${this.path})` })
      .toBe(this.path);
  }

  private currentPath(): string {
    const pathname = new URL(this.page.url()).pathname.replace(/\/+$/, '');
    return pathname === '' ? '/' : pathname;
  }
}
