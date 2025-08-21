### 2025-08-21 - Stabilisation de l'environnement local & refonte de l'UI Magasins

- **Problèmes résolus:**
  - Correction des erreurs de compilation et d'importation de modules entre les paquets `backend` et `backend/functions`.
  - Fiabilisation du chemin d'import dans `stores.controller.ts` pour pointer vers le répertoire `dist` compilé.
  - Correction du routage Express pour gérer le préfixe `/api`, ce qui a résolu l'erreur 404 sur la page des magasins.
  - Correction des ports de l'émulateur Firestore (8180 vs 8181) entre la configuration du frontend, les scripts backend et l'émulateur.
  - Activation de la persistance des données de l'émulateur en ajoutant l'option `--export-on-exit`.
  - Correction de la configuration de connexion à Firestore dans le frontend pour utiliser le bon port (8181), permettant l'affichage des produits.

- **Nouvelles fonctionnalités / Modifications:**
  - La page "Admin Magasin" (`StoresPage.tsx`) a été transformée en un tableau de bord à deux colonnes, sur le modèle de la page Catalogue.
  - Ajout d'un bouton "Accueil" pour la navigation.
  - Création d'un script (`scripts/seed_stores.mjs`) pour ajouter 16 magasins de test à la base de données.

- **Statut actuel:**
  - L'environnement de développement local est stable et fonctionnel.
  - Tous les problèmes connus sont résolus.
  - La page "Admin Magasin" est maintenant fonctionnelle et affiche les données dans l'émulateur local.

---

### 2025-08-19 - Debugging & Deployment Updates

- **Frontend Deployment:**
  - Successfully deployed frontend with updated `firebase.json` rewrite rules.
  - Public URL: `https://dreampos-94155.web.app`

- **Deployed Firestore Seeding:**
  - Successfully seeded deployed Firestore database with product data.
  - Products now visible on public website.

- **Current Issues (Admin Magasin / Stores Page):**
  - **Public Site (`https://dreampos-94155.web.app/stores`):** `Erreur: HTTP error! status: 404`
    - *Diagnosis:* Frontend request to `/api/stores` results in 404.
  - **Local (`http://localhost:3000/stores`):** `Erreur: Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
    - *Diagnosis:* Frontend expects JSON but receives HTML error page from local backend.
    - *Root Cause:* Firebase Functions emulator port conflicts (4100, 8180) preventing startup.

- **Next Steps:**
  - Resolve Firebase Emulator port conflicts to debug local `api` function.
  - Investigate public 404 error after local issue is resolved.

### Emulator Commands

- To start the emulators with the persisted data, run:
  ```sh
  npm run emulate
  ```

---

### 2025-08-19 (Soir) - Debugging Local Environment

- **Issue:** After fixing initial issues, running the emulator now results in a 500 Internal Server Error when accessing the "Admin Magasin" page. The root cause was identified as a build process issue.

- **Diagnosis:** The `backend` project was not being compiled into JavaScript, meaning the `backend/dist` directory was never created. The Functions emulator was therefore trying to import modules that didn't exist, causing the `Cannot find module` error at runtime.

- **Fixes Applied:**
  1.  **Corrected Import Path:** The import path in `stores.controller.ts` was updated to correctly point to the future compiled location: `../../../../dist/stores`.
  2.  **Created Build Scripts:** Added `build` and `start` scripts to the root `package.json` to ensure both `backend` and `backend/functions` are compiled in the correct order before the emulator starts.

- **Next Steps to Resolve the Issue:**
  1.  **Kill Conflicting Processes (si nécessaire):** If the emulator fails to start due to a "port taken" error (e.g., for port 8181), run the following commands in a new terminal:
      ```sh
      # Find the process ID (PID)
      netstat -aon | findstr :8181
      # Kill the process, replacing <PID> with the number found
      taskkill /PID <PID> /F
      ```
  2.  **Build the Projects:** Run the new build command from the project root:
      ```sh
      npm run build
      ```
  3.  **Start the Emulators:** Run the new start command from the project root:
      ```sh
      npm run start
      ```
  4.  **Verify:** Access `http://localhost:3000/stores` and confirm the page loads correctly.