import { existsSync } from 'node:fs';
import dotenv from 'dotenv';

// TEST_ENV=rec charge .env.rec puis .env : une variable deja definie n'est jamais ecrasee.
const testEnv = process.env.TEST_ENV;
const envFile = testEnv ? `.env.${testEnv}` : undefined;
if (envFile && !existsSync(envFile)) {
  throw new Error(`TEST_ENV "${testEnv}" : fichier ${envFile} introuvable`);
}
dotenv.config({ path: envFile ? [envFile, '.env'] : '.env', quiet: true });

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
  baseUrl: (process.env.BASE_URL ?? 'https://frequencies-instance-prprod.web.app').replace(
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
