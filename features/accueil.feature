# language: fr
@accueil
Fonctionnalité: Page d'accueil

  Contexte:
    Étant donné que je suis sur la page "Accueil"
    Et que je refuse les cookies sur la bannière

  @smoke
  Scénario: La page d'accueil s'affiche correctement
    Alors le titre de la page est "Accueil - Frequencies"
    Et la page d'accueil affiche le titre "Embarquez pour une aventure audio"
    Et la page d'accueil affiche le titre "Nos projets vedettes"
    Et le logo du site est affiché

  Plan du scénario: Le menu principal propose le lien <lien>
    Alors le menu principal propose le lien "<lien>"

    Exemples:
      | lien              |
      | Accueil           |
      | L'association     |
      | Nos actualités    |
      | Contact           |
      | Nous soutenir ❤️ |

  @smoke
  Plan du scénario: Le lien <lien> du menu mène à la page <page>
    Quand je clique sur le lien "<lien>" du menu principal
    Alors je me trouve sur la page "<page>"

    Exemples:
      | lien              | page           |
      | L'association     | L'association  |
      | Nos actualités    | Nos actualités |
      | Contact           | Contact        |
      | Nous soutenir ❤️ | Nous soutenir  |

  Plan du scénario: Le pied de page propose le lien <lien>
    Alors le pied de page propose le lien "<lien>"

    Exemples:
      | lien                               |
      | Mentions légales                   |
      | Conditions générales d'utilisation |
      | Déclaration d'accessibilité        |
      | Politique de confidentialité       |
      | Plan du site                       |

  Scénario: Le retour arrière ramène à l'accueil
    Quand je clique sur le lien "Contact" du menu principal
    Alors je me trouve sur la page "Contact"
    Quand je reviens à la page précédente
    Alors je me trouve sur la page "Accueil"
    Quand je vais à la page suivante
    Alors je me trouve sur la page "Contact"

