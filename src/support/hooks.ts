import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  ITestCaseHookParameter,
  Status,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { closeBrowser, closePage, openPage } from './browser-session';
import { config } from './config';
import { CustomWorld } from './world';

// Le timeout de step Cucumber (5 s par defaut) doit depasser ceux de Playwright (navigation = 3 x defaultTimeout).
setDefaultTimeout(config.defaultTimeout * 6);

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 80);
}

BeforeAll(() => {
  expect.configure({ timeout: config.defaultTimeout });
  mkdirSync(path.join(config.reportsDir, 'traces'), { recursive: true });
});

Before(async function (this: CustomWorld, { pickle }: ITestCaseHookParameter) {
  this.usePage(await openPage(pickle.uri));
});

After(async function (this: CustomWorld, { result, pickle }: ITestCaseHookParameter) {
  if (!this.hasPage) return;

  let tracePath: string | undefined;
  if (result?.status === Status.FAILED) {
    this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');
    tracePath = path.join(config.reportsDir, 'traces', `${slugify(pickle.name)}-${pickle.id}.zip`);
    this.log(`Trace Playwright : ${tracePath}`);
  }

  await closePage(tracePath);
  this.releasePage();
});

AfterAll(async () => {
  await closeBrowser();
});
