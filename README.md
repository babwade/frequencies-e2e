# frequencies-e2e

Tests end to end du site Frequencies.

Stack : Playwright + TypeScript + Cucumber. Les scénarios sont écrits en Gherkin français, le code reste en anglais.

## Installation

Prérequis : Node 20 ou plus.

```bash
git clone https://github.com/babwade/frequencies-e2e.git
cd frequencies-e2e
npm install
npm run install:browsers     # télécharge Chromium
cp .env.example .env         # optionnel, les valeurs par défaut suffisent
```

## Usage

| Commande | Effet |
|----------|-------|
| `npm test` | Lance tous les scénarios |
| `npm run test:smoke` | Lance seulement les scénarios `@smoke` |
| `npm run test:headed` | Lance les tests avec le navigateur visible |
| `npm run test:tag -- "@audio"` | Lance les scénarios d'un tag (`@accueil`, `@contact`, `@audio`, `@smoke`) |
| `npm run test:dry-run` | Vérifie le Gherkin et les steps, sans navigateur |
| `npm run typecheck` | Vérifie le TypeScript |
| `npm run format` | Formate le code avec Prettier |

Lancer un seul scénario, par sa ligne dans le fichier :

```bash
npx cucumber-js features/accueil.feature:12
```

## Rapports

Après un run, les résultats sont dans `reports/` (ignoré par Git) :

- `cucumber-report.html` : rapport à ouvrir dans un navigateur ;
- `traces/*.zip` : une trace par scénario en échec, à ouvrir avec `npx playwright show-trace reports/traces/<fichier>.zip`.

## Configuration

Les variables se définissent dans `.env` :

| Variable | Défaut | Rôle |
|----------|--------|------|
| `BASE_URL` | URL du site Frequencies | Site testé |
| `BROWSER` | `chromium` | `chromium`, `firefox` ou `webkit` |
| `HEADLESS` | `true` | `false` pour voir le navigateur |
| `DEFAULT_TIMEOUT` | `10000` | Délai maximal des actions, en ms |
| `SLOW_MO` | `0` | Ralentit chaque action, en ms |

### Plusieurs environnements

Pour cibler un autre environnement, créer un fichier `.env.<nom>` (par exemple `.env.rec`, ignoré par Git) et choisir le nom avec `TEST_ENV` :

```bash
# .env.rec
BASE_URL=https://mon-site-recette.example.com
```

```bash
TEST_ENV=rec npm test                  # Git Bash, macOS, Linux
npx cross-env TEST_ENV=rec npm test    # Windows, tous shells
```

Ordre de priorité, du plus fort au plus faible : variable du shell, `.env.<nom>`, `.env`, valeur par défaut. Une variable absente de `.env.<nom>` est donc reprise dans `.env`. Si le fichier demandé n'existe pas, le lancement s'arrête avec une erreur.

## Structure

```
features/     scénarios Gherkin (accueil, contact, lecteur audio, nos projets)
src/pages/    une classe par page ou composant : locators et actions (Page Object Model)
src/steps/    phrases Gherkin, qui appellent uniquement les méthodes des pages
src/support/  configuration, navigateur, hooks
```

## Écrire un scénario

Ajouter un fichier `.feature` dans `features/`, en français :

```gherkin
Étant donné que je suis sur la page "Accueil"
Et que je refuse les cookies sur la bannière
Alors le menu principal propose le lien "Contact"
```

Si la phrase n'existe pas encore, l'ajouter dans `src/steps/` en appelant une méthode de page. Les locators ne vont que dans `src/pages/`, jamais dans les steps.

Pour une nouvelle page : créer `src/pages/MaPage.ts` (`extends BasePage`, avec `name` et `path`), puis l'ajouter dans `src/pages/app.ts`.

## Contribuer

La branche `main` est protégée : on travaille sur une branche, puis on ouvre une pull request qui doit être approuvée par une autre personne avant la fusion.

```bash
git checkout -b feature/ma-modification
# ...modifications...
git push -u origin feature/ma-modification
```
