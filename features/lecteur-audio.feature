# language: fr
@audio
Fonctionnalité: Lecteur audio

  Contexte:
    Étant donné que je suis sur la page "Accueil"
    Et que je refuse les cookies sur la bannière

  @smoke
  Scénario: Le lecteur est affiché et prêt à lire
    Alors le lecteur audio est visible
    Et le lecteur audio est chargé
    Et le lecteur audio affiche le bouton de lecture
    Et le lecteur audio affiche le bouton de piste suivante
    Et le lecteur audio affiche le curseur de progression
    Et la lecture audio est en pause

  @smoke
  Scénario: Le lecteur démarre la lecture
    Quand je lance la lecture audio
    Alors la lecture audio est en cours
    Et la progression de la lecture audio avance
    Et le lecteur audio affiche le bouton de pause

  Scénario: Le lecteur met la lecture en pause
    Quand je lance la lecture audio
    Et je mets la lecture audio en pause
    Alors la lecture audio est en pause
    Et le lecteur audio affiche le bouton de lecture


  Scénario: Le lecteur reprend la lecture après une pause
    Quand je lance la lecture audio
    Et je mets la lecture audio en pause
    Et je lance la lecture audio
    Alors la lecture audio est en cours
    Et la progression de la lecture audio avance

  Scénario: La lecture continue pendant la navigation vers une autre page
    Quand je lance la lecture audio
    Et je clique sur le lien "Contact" du menu principal
    Alors je me trouve sur la page "Contact"
    Et le lecteur audio est visible
    Et la lecture audio est en cours
    Et la progression de la lecture audio avance

  Plan du scénario: Le lecteur est présent sur la page <page>
    Quand je navigue vers la page "<page>"
    Alors le lecteur audio est visible

    Exemples:
      | page          |
      | Accueil       |
      | Contact       |
      | L'association |
