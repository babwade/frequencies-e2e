import type { Page } from 'playwright';
import { AssociationPage } from './AssociationPage';
import type { BasePage } from './BasePage';
import { ContactPage } from './ContactPage';
import { NosProjetsPage } from './NosProjets';
import { HomePage } from './HomePage';
import { NewsPage } from './NewsPage';
import { PageNavigation } from './PageNavigation';
import { SupportPage } from './SupportPage';
import { AudioPlayer } from './components/AudioPlayer';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';
import { HeaderNav } from './components/HeaderNav';

/** Point d'accès unique aux pages et composants, instanciés pour la page Playwright d'un scénario. */
export function createApp(page: Page) {
  const home = new HomePage(page);
  const contact = new ContactPage(page);
  const nosprojets = new NosProjetsPage(page);
  const navigation = new PageNavigation(page);
  const header = new HeaderNav(page);
  const footer = new Footer(page);
  const cookieBanner = new CookieBanner(page);
  const audioPlayer = new AudioPlayer(page);
  const association = new AssociationPage(page);
  const news = new NewsPage(page);
  const support = new SupportPage(page);

  // Toute page utilisable dans une feature DOIT être déclarée ici : sinon le step échoue.
  const pages: BasePage[] = [home, contact, nosprojets, association, news, support];

  return {
    home,
    contact,
    nosprojets,
    association,
    news,
    support,
    navigation,
    header,
    footer,
    cookieBanner,
    audioPlayer,
    page(name: string): BasePage {
      const found = pages.find((candidate) => candidate.name === name);
      if (!found) {
        throw new Error(
          `Aucun page object pour la page "${name}". Pages déclarées : ${pages.map((p) => p.name).join(', ')}. ` +
            `Créer la classe dans src/pages/ puis l'ajouter à la liste de src/pages/app.ts.`,
        );
      }
      return found;
    },
  };
}

export type App = ReturnType<typeof createApp>;
