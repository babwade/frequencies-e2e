# language: fr
@nosprojets
Fonctionnalité: Nos projets

  Contexte:
    Étant donné que je suis sur la page "Nos-projets"
    Et que je refuse les cookies sur la bannière

  Scénario: La page nos projets s'affiche correctement
  Et la page de nosprojets affiche le titre "Fictions sonores - Frequencies"

  Plan du scénario: Le sous-menu <sous-menu> change l'URI et l'entrée active du menu principal
    Étant donné que je suis sur la page "Accueil"
    Alors le menu principal met en évidence "Accueil"
    Quand je survole l'entrée "Nos projets" du menu principal
    Et je clique sur le lien "<sous-menu>" du menu principal
    Alors l'URL contient "<uri>"
    Et le titre de la page est "<titre>"
    Et le menu principal met en évidence "Nos projets"
    Et le menu principal ne met pas en évidence "Accueil"
    Exemples:
      | sous-menu        | uri               | titre                           |
      | Fictions sonores | /fictions-sonores | Fictions sonores - Frequencies  |
      | Projets sonores  | /projets-sonores  | Projets sonores - Frequencies   |
      | Courts métrages  | /courts-metrages  | Courts métrages - Frequencies   |
      | Projets vidéo    | /projets-video    | Projets vidéo - Frequencies     |

