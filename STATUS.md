# État du Projet - POS Parfumerie

*Dernière mise à jour : 03/08/2025*

Ce fichier est un résumé pour reprendre rapidement le développement.

## ✅ Ce qui fonctionne

1.  **Serveur Backend** : Démarre et fonctionne. Il sert les données des produits et gère l'authentification.
2.  **Serveur Frontend** : Démarre et fonctionne. Il affiche l'interface utilisateur construite avec React et Bootstrap.
3.  **Authentification** : Un écran de connexion fonctionnel qui vérifie les identifiants (`ADMIN`/`1234` et `SALES1`/`POS`) auprès du backend.
4.  **Déconnexion** : Un bouton permet de fermer la session et de revenir à l'écran de connexion.
5.  **Affichage des Produits** : Une fois connecté, l'application récupère et affiche une liste de produits factices depuis le backend.

---

## 🚀 Comment lancer le projet

Pour commencer à travailler, vous devez lancer les **deux** serveurs dans **deux** terminaux séparés.

### 1. Lancer le Backend

Ouvrez un premier terminal et exécutez les commandes suivantes :

```bash
cd C:\Users\szamb\pos-system\backend
npm start
```

> Laissez ce terminal ouvert. Il fait fonctionner votre API.

### 2. Lancer le Frontend

Ouvrez un **second** terminal et exécutez les commandes suivantes :

```bash
cd C:\Users\szamb\pos-system\frontend
npm start
```

> Cela devrait ouvrir automatiquement une page dans votre navigateur à l'adresse `http://localhost:3000`.

---

## 🎯 Prochaines étapes possibles

*   **Gestion du Panier** : Implémenter la logique pour que le bouton "Ajouter au panier" fonctionne.
*   **Gestion des Stocks** : Mettre à jour le stock d'un produit après une vente.
*   **Base de Données** : Remplacer les fichiers de données factices (`auth.ts`, `products.ts`) par une véritable base de données.
*   **Gestion des Rôles** : Restreindre certaines actions en fonction du rôle de l'utilisateur (par exemple, seul un ADMIN peut modifier un produit).
