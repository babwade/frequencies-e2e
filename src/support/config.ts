import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

const SUPPORTED_BROWSERS: readonly BrowserName[] = ['chromium', 'firefox', 'webkit'];

function readBrowser(): BrowserName {
  const value = (process.env.BROWSER ?? 'chromium').toLowerCase();
  if (!SUPPORTED_BROWSERS.includes(value as BrowserName)) {
    throw new Error(
      `BROWSER "${value}" non supporte. Valeurs possibles : ${SUPPORTED_BROWSERS.join(', ')}`,
    );
  }
  return value as BrowserName;
}

function readNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  const value = Number(raw);
  if (Number.isNaN(value)) {
    throw new Error(`${name} doit etre un nombre (valeur recue : "${raw}")`);
  }
  return value;
}

export const config = {
  baseUrl: (process.env.BASE_URL ?? 'https://frequencies-instance-dev.web.app').replace(
    /\/+$/,
    '',
  ),
  browser: readBrowser(),
  headless: (process.env.HEADLESS ?? 'true').toLowerCase() !== 'false',
  defaultTimeout: readNumber('DEFAULT_TIMEOUT', 10_000),
  slowMo: readNumber('SLOW_MO', 0),
  reportsDir: 'reports',
  viewport: { width: 1366, height: 768 },
  locale: 'fr-FR',
} as const;
