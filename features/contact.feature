# language: fr
@contact
Fonctionnalité: Page de contact

  Contexte:
    Étant donné que je suis sur la page "Contact"
    Et que je refuse les cookies sur la bannière

  @smoke
  Scénario: La page de contact s'affiche correctement
    Alors le titre de la page est "Nous contacter - Frequencies"
    Et la page de contact affiche le titre "Nous contacter"
    Et la page de contact affiche le titre "Envoyer un message"

  @smoke
  Scénario: Le formulaire présente tous ses champs
    Alors le champ nom est affiché
    Et le champ e-mail est affiché
    Et le champ message est affiché
    Et le consentement est affiché
    Et le bouton d'envoi est affiché

  Scénario: Le bouton d'envoi est désactivé tant que le formulaire est vide
    Alors le bouton d'envoi est désactivé

  Plan du scénario: Le champ <champ> respecte la contrainte <attribut>
    Alors le champ <champ> a l'attribut "<attribut>" égal à "<valeur>"

    Exemples:
      | champ   | attribut    | valeur    |
      | nom     | maxlength   | 70        |
      | nom     | placeholder | Votre nom |
      | e-mail  | type        | email     |
      | e-mail  | maxlength   | 70        |
      | message | minlength   | 10        |
      | message | maxlength   | 1000      |

  Scénario: La saisie des champs est conservée
    Quand je saisis "Jean Test" dans le champ nom
    Et je saisis "jean.test@example.com" dans le champ e-mail
    Et je saisis "Message de test automatisé" dans le champ message
    Alors le champ nom contient "Jean Test"
    Et le champ e-mail contient "jean.test@example.com"
    Et le champ message contient "Message de test automatisé"

  Scénario: Le consentement peut être coché puis décoché
    Alors le consentement est décoché
    Quand je coche le consentement
    Alors le consentement est coché
    Quand je décoche le consentement
    Alors le consentement est décoché
