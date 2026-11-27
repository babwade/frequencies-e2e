import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import type { Page } from 'playwright';
import { App, createApp } from '../pages/app';

export class CustomWorld extends World {
  private _page?: Page;
  private _app?: App;

  constructor(options: IWorldOptions) {
    super(options);
  }

  get page(): Page {
    if (!this._page) throw new Error("La page n'est pas initialisee (hook Before non execute ?)");
    return this._page;
  }

  get hasPage(): boolean {
    return this._page !== undefined;
  }

  /** Pages et composants (page objects) du scenario en cours : les steps passent uniquement par eux. */
  get app(): App {
    this._app ??= createApp(this.page);
    return this._app;
  }

  usePage(page: Page): void {
    this._page = page;
    this._app = undefined;
  }

  releasePage(): void {
    this._page = undefined;
    this._app = undefined;
  }
}

setWorldConstructor(CustomWorld);
