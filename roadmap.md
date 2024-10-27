# Roadmap du Projet Convertisseur Crédit Agricole

## Introduction
Ce document décrit les futures fonctionnalités et améliorations possibles pour le projet Convertisseur. L'objectif est de rendre l'application plus complète, intuitive et utile pour les utilisateurs.

## Fonctionnalités à venir

### 1. **Historique des conversions**
   - **Description** : Détailler plus l'historique des conversions lancées par l'utilisateur.
   - **Détails** :
     - Inclure la date et l'heure de chaque conversion.
     - Permettre à l'utilisateur de supprimer des entrées de l'historique.

### 2. **Graphique des taux de change**
   - **Description** : Intégrer un graphique pour visualiser l'évolution des taux de change au fil du temps.
   - **Détails** :
     - Graphique affichant les variations des taux sur une période définie (ex : 7 jours, 1 mois) en utilisant ChartJS par exemple avec lequel on instanciera une chart de type Line.
     - Possibilité pour l'utilisateur de choisir la période à afficher (DateRange).
     - Utiliser une API externe pour récupérer les données historiques des taux de change.

### 3. **Notifications de taux (Système de Push)**
   - **Description** : Ajouter une fonctionnalité de notifications pour informer l'utilisateur lorsque le taux de change atteint une valeur cible.
   - **Détails** :
     - Permettre à l'utilisateur de définir un taux cible pour une devise spécifique.
     - Afficher une notification ou un message dans l'application lorsque le taux atteint cette valeur.
     - Option pour recevoir des notifications par e-mail.

### 4. **Mode sombre**
   - **Description** : Ajouter un mode sombre pour améliorer le confort visuel de l'utilisateur.
   - **Détails** :
     - Permettre à l'utilisateur de basculer entre le mode clair et le mode sombre.
     - Sauvegarder la préférence de l'utilisateur pour un chargement automatique de son mode préféré.
     - Adapter les couleurs des composants pour un affichage optimal en mode sombre.

### 5. **Conversion de devises multiples**
   - **Description** : Permettre la conversion simultanée de plusieurs devises et pas uniquement EUR et USD.
   - **Détails** :
     - L'utilisateur peut choisir plusieurs devises cibles et afficher les montants convertis en une seule fois.
     - Afficher les résultats sous forme de tableau avec les différentes devises.
     - Option pour télécharger les résultats en format CSV.

### 6. **Internationalisation (i18n)**
   - **Description** : Rendre l'application multilingue pour une meilleure accessibilité.
   - **Détails** :
     - Ajouter la prise en charge de plusieurs langues (anglais, espagnol, allemand, etc.).
     - Utiliser une bibliothèque comme `react-i18next` pour gérer les traductions.
     - Permettre à l'utilisateur de choisir la langue de l'interface.

## Conclusion
Ces fonctionnalités permettront de rendre le *Convertisseur CA* plus riche en fonctionnalités, plus convivial et mieux adapté aux besoins des utilisateurs. Chacune des fonctionnalités mentionnées ci-dessus contribuera à l'amélioration de l'expérience utilisateur et à la valeur ajoutée de l'application.
