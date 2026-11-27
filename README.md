# frequencies-e2e

Tests end to end du site Frequencies (préprod : https://frequencies-instance-prprod.web.app/).

Stack : Playwright (bibliothèque) + TypeScript + Cucumber, scénarios en **Gherkin français**. Le code reste en anglais.

## Installation

```bash
npm install
npm run install:browsers      # télécharge Chromium
cp .env.example .env          # optionnel : les valeurs par défaut suffisent
```

Prérequis : Node 20 ou plus.

## Lancer les tests

| Commande | Effet |
|----------|-------|
| `npm test` | Toute la suite (35 scénarios, environ 45 s) |
| `npm run test:smoke` | Scénarios `@smoke` uniquement |
| `npm run test:headed` | Navigateur visible : une seule fenêtre par fichier `.feature` (voir « Navigateur » ci-dessous) |
| `npm run test:tag -- "<tag>"` | Lance les scénarios du tag donné à la volée, par exemple `npm run test:tag -- "@audio"` ou `npm run test:tag -- "@contact and not @smoke"` |
| `npm run test:tag:headed -- "<tag>"` | Idem, avec le navigateur visible |
| `npm run test:dry-run` | Vérifie le Gherkin et le câblage des steps, sans navigateur |
| `npm run typecheck` | Vérification TypeScript |
| `npm run format` | Prettier sur `src` et `cucumber.js` (les `.feature` ne sont pas formatés) |

Filtrer par tag ou par fichier :

```bash
npx cucumber-js --tags "@audio"
npx cucumber-js --tags "@contact and not @smoke"
npx cucumber-js features/accueil.feature:12     # un scénario par sa ligne
```

Tags disponibles : `@smoke`, `@accueil`, `@contact`, `@audio`.

## Configuration (`.env`)

| Variable | Défaut | Rôle |
|----------|--------|------|
| `BASE_URL` | URL de préprod | Site cible |
| `BROWSER` | `chromium` | `chromium`, `firefox` ou `webkit` (seul Chromium est installé par défaut) |
| `HEADLESS` | `true` | `false` pour voir le navigateur |
| `DEFAULT_TIMEOUT` | `10000` | Délai (ms) des actions et vérifications. Navigation : x3. Step Cucumber : x6 |
| `SLOW_MO` | `0` | Ralentit chaque action (ms) |

## Résultats

Dans `reports/` (ignoré par Git) :
- `cucumber-report.html` et `cucumber-report.json` ;
- `traces/*.zip` pour chaque scénario en échec, à ouvrir avec `npx playwright show-trace reports/traces/<fichier>.zip`.

Une capture d'écran est aussi attachée au rapport en cas d'échec.

## Organisation (Page Object Model)

```
features/                      Scénarios Gherkin (accueil, contact, lecteur-audio)
src/
  pages/
    BaseComponent.ts           actions et vérifications génériques sur un Locator (click, fill, expect...)
    BasePage.ts                socle des pages : name, path, open(), expectCurrent()
    HomePage, ContactPage, AssociationPage, NewsPage, SupportPage   une classe par page : ses locators et ses méthodes
    PageNavigation.ts          recharger, retour arrière, URL, titre (indépendants d une page)
    components/                blocs partagés : HeaderNav, Footer, CookieBanner, AudioPlayer
    app.ts                     createApp(page) : instancie pages et composants d'un scénario
  steps/                       une phrase Gherkin = un appel de méthode de page, jamais de locator
  support/                     config, browser-session (cycle de vie du navigateur), World (expose `this.app`), hooks
  (aucun dossier helpers : tout passe par les page objects)
```

Règles du modèle :
- **Les locators vivent uniquement dans les classes de `src/pages/`**, déclarés en propriétés `private readonly`. Les steps ne les voient pas (un `grep getBy src/steps` doit rester vide).
- **Les classes de pages héritent de `BaseComponent`** et ne font que composer ses actions et vérifications génériques.
- Chaque scénario a ses propres instances de pages (`this.app`) et un état propre (voir « Navigateur »).

## Navigateur

| Mode | Navigateur | Fenêtre |
|------|-----------|---------|
| Headless (défaut, CI) | un seul pour toute la suite | un contexte neuf par scénario : isolation maximale |
| Headed (`npm run test:headed`) | un lancé par fichier `.feature`, fermé à la fin du fichier | **une seule fenêtre réutilisée** par tous les scénarios du fichier |

En headed, entre deux scénarios d'un même fichier, `browser-session.ts` remet l'état à zéro : cookies, `localStorage`, `sessionStorage` (donc le consentement cookies, qui réapparaît) et page vierge (`about:blank`, ce qui coupe aussi le son du lecteur). Si cette remise à zéro échoue, un contexte neuf est recréé au scénario suivant.

Ce fonctionnement repose sur l'exécution séquentielle de Cucumber (`parallel: 1`, ordre par défaut) qui joue les scénarios d'un fichier à la suite. Si on active le parallélisme ou un ordre aléatoire, il faudra revoir `browser-session.ts`.

Les traces Playwright restent par scénario dans les deux modes (une trace par échec).

## Écrire un scénario

Tout scénario commence en général par la page puis le bandeau cookies, qui recouvre le lecteur audio :

```gherkin
Étant donné que je suis sur la page "Accueil"
Et que je refuse les cookies sur la bannière
```

### Steps disponibles

| Domaine | Phrases |
|---------|---------|
| Navigation | `je suis sur la page "Contact"`, `je navigue vers la page "/contact"`, `je recharge la page`, `je reviens à la page précédente` |
| Page | `je me trouve sur la page "Contact"`, `l'URL contient "/contact"`, `le titre de la page est "…"` ou `contient "…"` |
| Cookies | `je refuse les cookies sur la bannière`, `j'accepte les cookies sur la bannière` |
| Menu principal | `je clique sur le lien "Contact" du menu principal`, `le menu principal propose le lien "…"`, `le logo du site est affiché` |
| Pied de page | `le pied de page propose le lien "…"` |
| Accueil | `la page d'accueil affiche le titre "…"` |
| Contact | `je saisis "…" dans le champ nom` (ou `e-mail`, `message`), `je coche le consentement` / `je décoche le consentement`, `la page de contact affiche le titre "…"`, `le champ nom est affiché`, `le champ nom contient "…"`, `le champ nom a l'attribut "maxlength" égal à "70"`, `le consentement est affiché` / `coché` / `décoché`, `le bouton d'envoi est affiché` / `désactivé` |
| Lecteur audio | `je lance la lecture audio`, `je mets la lecture audio en pause`, `le lecteur audio est visible` / `chargé`, `le lecteur audio affiche le bouton de lecture` / `de pause` / `de piste suivante` / `le curseur de progression`, `la lecture audio est en cours` / `en pause`, `la progression de la lecture audio avance` |

L'état du lecteur est lu sur l'élément `<audio>` (`paused`, `currentTime`) : la progression de la position prouve que le son est réellement lu.

## Conventions et pièges

- **Pas de CSS ni de XPath.** On localise par rôle ARIA, nom accessible, label, texte ou `data-testid`. Si le site manque d'un attribut utile, le demander à l'équipe front plutôt que d'ajouter un sélecteur fragile. Seule exception documentée : le lecteur audio, ancré sur son élément `<audio>`.
- **Éléments en doublon** : le site duplique des blocs cachés pour le responsive. Les locators filtrent sur `visible` et, si deux éléments visibles correspondent, Playwright lève une erreur qui les liste : restreindre le locator à son conteneur (menu, pied de page...).
- **Pas de `networkidle`** : le flux audio et GTM maintiennent du réseau actif. La navigation attend `main` visible et un titre non vide.
- **Pas de `sleep`** : les vérifications se réessayent automatiquement jusqu'à `DEFAULT_TIMEOUT`.
- **Formulaire de contact** : le bouton d'envoi reste désactivé en automatisation (protection anti-robot) et on n'envoie jamais de message réel en préprod. Les scénarios vérifient l'affichage, les contraintes et la saisie.
- **Bandeau cookies (CookieFirst)** : il apparaît après le chargement. Le step `je refuse les cookies sur la bannière` l'attend 5 s et continue s'il est absent.
- **Dépendance au contenu** : les libellés du menu et la piste du lecteur viennent de la préprod. Un changement éditorial peut faire échouer un test sans qu'il y ait de régression.

## Ajouter une page ou un composant

**Toute page utilisée dans une feature doit avoir son page object.** `je suis sur la page "X"` échoue avec la liste des pages déclarées si `X` n'en a pas. Il n'existe ni registre de chemins, ni navigation par chemin brut.

1. **Page** : créer `src/pages/MaPage.ts` (`extends BasePage`) avec `name` (le nom utilisé dans les features) et `path`. Y déclarer ses locators en `private readonly` et exposer des méthodes (`fillX`, `expectY`...) qui s'appuient sur `click`, `fill`, `expectVisible`... de `BaseComponent`.
2. **Bloc partagé** (modale, carte...) : même principe dans `src/pages/components/`, en `extends BaseComponent`.
3. **Déclaration** : ajouter l'instance dans `src/pages/app.ts` (liste `pages` pour une page, propriété de l'objet pour un composant).
4. **Steps** : écrire-les dans `src/steps/<nom>.steps.ts` en appelant uniquement `this.app.<page>.<méthode>()`.

`AssociationPage`, `NewsPage` et `SupportPage` ne contiennent pour l'instant que leur nom et leur chemin : on y ajoutera leurs locators quand des scénarios les exerceront.
