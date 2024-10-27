# Todo List - Raccourcis Pris à Cause du Temps Imparti

## Introduction
Ce document répertorie les choix et raccourcis qui ont été effectués pour gagner du temps lors du développement du projet *Convertisseur CA*. Ces raccourcis devront être revus et améliorés lors des prochaines itérations afin de garantir une meilleure qualité du code et une expérience utilisateur optimale.

---

## Raccourcis Pris

### 1. **Validation de saisie simplifiée**
   - Actuellement, la validation des champs de saisie (montant, taux fixe) se limite à la vérification de valeurs numériques de base.
   - Il n'y a pas de gestion des valeurs aberrantes (comme les montants négatifs ou des nombres extrêmement élevés).
   - Amélioration à prévoir : ajouter une validation complète avec des messages d'erreur adaptés pour l'utilisateur.

### 2. **Absence de mise en cache des taux de change**
   - Les taux de change sont récupérés à chaque mise à jour sans mise en cache.
   - Dans le cas d'utilisation d'API on fera face à des appels fréquents qui pourraient nuire aux performances de l'application en production.
   - Amélioration à prévoir : mettre en place un mécanisme de mise en cache temporaire pour les taux de change.

### 3. **Interface utilisateur (UI) non optimisée pour le mode sombre**
   - Le mode sombre n'est pas implémenté.
   - Le design n'est pas harmonisé entre le mode clair et le mode sombre.
   - Amélioration à prévoir : ajuster les couleurs et styles pour un mode sombre plus cohérent, on peut aussi mettre en place un Theme Builder qui permettra à l'utilisateur d'avoir toute sa liberté pour personnaliser l'interface

### 4. **Gestion de l'historique de conversion simplifiée**
   - L'historique des conversions n'est pas stocké de manière persistante (pas de stockage local ni de base de données).
   - Les données de l'historique sont perdues lorsque la page est actualisée.
   - Amélioration à prévoir : implémenter une persistance de l'historique dans `localStorage` ou utiliser une base de données.

### 5. **Tests unitaires et d'intégration manquants**
   - Par manque de temps, les tests unitaires et d'intégration n'ont pas été priorisés.
   - Cela signifie que le projet n'a pas de couverture de tests pour garantir la stabilité et la fiabilité des fonctionnalités.
   - Amélioration à prévoir : écrire des tests unitaires avec `Jest` pour les composants critiques et les fonctionnalités de conversion.

### 6. **Utilisation de styles en ligne et de styled-components de manière mixte**
   - Certains composants utilisent des styles en ligne pour gagner du temps, au lieu de recourir entièrement à `styled-components`.
   - Cela peut rendre le code moins uniforme et plus difficile à maintenir à long terme.
   - Amélioration à prévoir : uniformiser l'utilisation de `styled-components` pour une meilleure organisation des styles.


### 7. **Fonctionnalité de mise à jour de l'heure simplifiée**
   - La mise à jour de l'heure actuelle est effectuée via un `setInterval` qui met à jour l'affichage toutes les secondes.
   - Cela pourrait être optimisé pour éviter de re-rendre inutilement certains composants.
   - Amélioration à prévoir : explorer des alternatives comme `requestAnimationFrame` pour une meilleure performance.

### 8. **Documentation insuffisante**
   - La documentation des composants et des fonctions est minimaliste, se limitant souvent à des commentaires de base.
   - Cela pourrait rendre la maintenance et l'évolutivité du projet plus difficile pour les nouveaux développeurs.
   - Amélioration à prévoir : enrichir la documentation, notamment pour les composants clés et les hooks personnalisés.

### 9. **Absence de gestion avancée des préférences utilisateur**
   - Les préférences utilisateur (ex. sélection de la devise par défaut, langue) ne sont pas sauvegardées.
   - L'utilisateur doit reconfigurer ses préférences à chaque session.
   - Amélioration à prévoir : sauvegarder les préférences utilisateur dans `localStorage` pour une meilleure expérience utilisateur.

---

## Conclusion
Ces raccourcis ont permis de livrer une version fonctionnelle de l'application dans un délai restreint, mais il est essentiel de les aborder pour améliorer la qualité et les performances de l'application. Chaque point mérite une attention particulière pour offrir une meilleure expérience aux utilisateurs et assurer la maintenabilité du projet.
