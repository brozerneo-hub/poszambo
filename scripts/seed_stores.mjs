// Script pour initialiser les magasins dans Firestore Emulator
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  connectFirestoreEmulator, 
  collection, 
  addDoc 
} from 'firebase/firestore';

console.log("--- Script d'initialisation des magasins démarré ---");

const firebaseConfig = {
  projectId: "dreampos-94155"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Connexion à l'émulateur Firestore...");
try {
    connectFirestoreEmulator(db, 'localhost', 8181);
    console.log("✅ Connecté à l'émulateur Firestore.");
} catch (e) {
    console.warn("⚠️ L'émulateur semble déjà connecté. On continue...");
}

const stores = [
    { name: "CELINE PARIS GRENELLE", address: "16 Rue de Grenelle, 75007 Paris", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE PARIS MONTAIGNE", address: "53 Avenue Montaigne, 75008 Paris", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE CANNES MEN & WOMEN", address: "43 Boulevard de la Croisette, 06400 Cannes", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE SAINT-TROPEZ", address: "12 Boulevard Vasserot (Place des Lices), 83990 Saint-Tropez", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE PARIS CDG TERMINAL 2E HALL K", address: "Terminal 2E Hall K, 95700 Roissy-en-France", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE PARIS DUPHOT MEN & WOMEN", address: "4 rue Duphot, 75001 Paris", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE PARIS CDG TERMINAL 2E HALL M", address: "Paris Charles de Gaulle Airport, Terminal 2E Hall M, 95700 Roissy-en-France", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE PARIS CDG TERMINAL T1", address: "Aéroport de Paris-Charles de Gaulle, TERMINAL T1, 95700 Roissy-en-France", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE PARIS CDG TERMINAL 2E HALL L", address: "Aéroport de Paris-Charles de Gaulle, Terminal 2E Hall L, 95700 Roissy-en-France", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE PARIS SAINT-HONORÉ", address: "384 RUE SAINT-HONORÉ, 75001 Paris", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE PARIS MONTAIGNE 44", address: "44 Avenue Montaigne, 75008 Paris", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE PARIS PRINTEMPS HAUSSMANN LEATHER GOODS", address: "64 Boulevard Haussmann, Rez-de-Chaussée, 75009 Paris", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE PARIS PRINTEMPS HAUSSMANN READY TO WEAR", address: "64 Boulevard Haussmann, Deuxième Etage, 75009 Paris", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE PARIS GALERIES LAFAYETTE READY TO WEAR", address: "40 Boulevard Haussmann, Espace Luxe Premier Etage, 75009 Paris", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE PARIS LE BON MARCHÉ", address: "24 Rue de Sèvres, Rez-de-Chaussée, 75007 Paris", salesCount: 0, stockQuantity: 0 },
    { name: "CELINE PARIS LE BON MARCHÉ WOMEN SHOES", address: "24 Rue de Sèvres, Deuxième Etage, 75007 Paris", salesCount: 0, stockQuantity: 0 },
];

async function seedStores() {
  console.log("--- Démarrage de la création des magasins ---");
  let count = 0;
  for (const store of stores) {
    try {
      await addDoc(collection(db, 'stores'), store);
      count++;
      console.log(`  -> ✅ Magasin créé: ${store.name}`);
    } catch (error) {
      console.error(`  -> ❌ Erreur pour le magasin ${store.name}:`, error.message);
    }
  }
  console.log(`--- Création terminée. ${count}/${stores.length} magasins ajoutés. ---
`);
  return count === stores.length;
}

async function main() {
  console.log("\n🌱 === DÉBUT DE L'INITIALISATION DES MAGASINS ===\n");
  const success = await seedStores();
  if (success) {
    console.log("\n🎉 Données des magasins créées avec succès !");
    console.log("🔍 Vérifiez sur: http://localhost:4000/firestore");
  } else {
    console.error("💥 Échec de la création de certains magasins.");
  }
  console.log(`\n--- Script terminé. Statut: ${success ? 'SUCCÈS' : 'ÉCHEC'} ---
`);
}

main();
