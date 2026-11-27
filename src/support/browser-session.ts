import { Browser, BrowserContext, Page, chromium, firefox, webkit } from 'playwright';
import { config } from './config';

const launchers = { chromium, firefox, webkit };

/**
 * Headed : une seule fenêtre par fichier .feature, réutilisée par tous ses scénarios (état remis à zéro entre deux).
 * Headless : un contexte neuf par scénario, plus isolé (cas de la CI).
 * Repose sur l'exécution séquentielle de Cucumber (parallel: 1) qui joue les scénarios d'un fichier à la suite.
 */
const reuseWindowPerFeature = !config.headless;

let browser: Browser | undefined;
let context: BrowserContext | undefined;
let page: Page | undefined;
let currentFeature: string | undefined;

async function createContext(): Promise<void> {
  browser ??= await launchers[config.browser].launch({
    headless: config.headless,
    slowMo: config.slowMo,
    // Évite le blocage de l'autoplay ; la lecture reste déclenchée par un vrai clic dans les scénarios.
    args: config.browser === 'chromium' ? ['--autoplay-policy=no-user-gesture-required'] : [],
  });
  context = await browser.newContext({
    baseURL: config.baseUrl,
    viewport: config.viewport,
    locale: config.locale,
  });
  context.setDefaultTimeout(config.defaultTimeout);
  context.setDefaultNavigationTimeout(config.defaultTimeout * 3);
  await context.tracing.start({ screenshots: true, snapshots: true });
  page = await context.newPage();
}

/** Retourne la page du scénario : nouvelle fenêtre, ou celle de la feature en cours en mode headed. */
export async function openPage(featureUri: string): Promise<Page> {
  if (reuseWindowPerFeature && featureUri !== currentFeature) {
    await closeBrowser();
    currentFeature = featureUri;
  }
  if (!context || !page) await createContext();
  await context!.tracing.startChunk();
  return page!;
}

/** Fin de scénario : sauvegarde la trace si un chemin est fourni, puis libère ou réinitialise la page. */
export async function closePage(tracePath?: string): Promise<void> {
  if (!context || !page) return;
  await context.tracing.stopChunk(tracePath ? { path: tracePath } : undefined);

  if (reuseWindowPerFeature) {
    try {
      await resetState(context, page);
      return;
    } catch {
      // Page ou contexte inutilisable : on repart sur un contexte neuf au scénario suivant.
    }
  }
  await context.close().catch(() => undefined);
  context = undefined;
  page = undefined;
}

// Cookies, stockage local (consentement CookieFirst) et lecture audio : about:blank coupe le son.
async function resetState(ctx: BrowserContext, current: Page): Promise<void> {
  await current
    .evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    })
    .catch(() => undefined);
  await ctx.clearCookies();
  await current.goto('about:blank');
}

export async function closeBrowser(): Promise<void> {
  await context?.close().catch(() => undefined);
  await browser?.close().catch(() => undefined);
  browser = undefined;
  context = undefined;
  page = undefined;
}
