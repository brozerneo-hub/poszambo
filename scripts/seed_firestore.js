// Script (CommonJS) pour initialiser des données de test dans Firestore Emulator
const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  addDoc,
  setDoc,
  doc,
  Timestamp
} = require('firebase/firestore');

console.log("--- Script d'initialisation (CommonJS) démarré ---");

const firebaseConfig = {
  projectId: "dreampos-94155"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// console.log("Connexion à l'émulateur Firestore...");
// try {
//     connectFirestoreEmulator(db, 'localhost', 8180);
//    console.log("✅ Connecté à l'émulateur Firestore.");
// } catch (e) {
//     console.warn("⚠️ L'émulateur semble déjà connecté. On continue...");
// }


// Données de test pour les catégories
const testCategories = [
  {
    id: 'cat-montres',
    name: 'Montres',
    description: 'Horlogerie de luxe',
    sortOrder: 1,
    isActive: true
  },
  {
    id: 'cat-parfums',
    name: 'Parfums',
    description: 'Fragrances premium',
    sortOrder: 2,
    isActive: true
  },
  {
    id: 'cat-bijoux',
    name: 'Bijoux',
    description: 'Joaillerie fine',
    sortOrder: 3,
    isActive: true
  },
  {
    id: 'cat-maroquinerie',
    name: 'Maroquinerie',
    description: 'Cuir de luxe',
    sortOrder: 4,
    isActive: true
  }
];

// Données de test pour les produits
const testProducts = [
  {
    name: 'Montre Luxury Gold Edition',
    category: 'Montres',
    price: 2850.00,
    stock: 5,
    description: 'Montre en or 18 carats avec bracelet cuir italien, mouvement suisse automatique',
    sku: 'WTC-LUX-001',
    vatRate: 0.20,
    images: ['/assets/watches/luxury-gold.jpg'],
    isActive: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdBy: 'admin-seed'
  },
  {
    name: 'Parfum Élégance Royale',
    category: 'Parfums',
    price: 145.00,
    stock: 25,
    description: 'Eau de parfum 100ml aux notes florales et boisées, édition limitée',
    sku: 'PRF-ELE-002',
    vatRate: 0.20,
    images: ['/assets/perfumes/elegance.jpg'],
    isActive: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdBy: 'admin-seed'
  },
  {
    name: 'Collier Diamant Éternité',
    category: 'Bijoux',
    price: 3200.00,
    stock: 2,
    description: "Collier or blanc 18ct serti de diamants VVS, certificat d'authenticité inclus",
    sku: 'JWL-DIA-003',
    vatRate: 0.20,
    images: ['/assets/jewelry/diamond-necklace.jpg'],
    isActive: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdBy: 'admin-seed'
  },
  {
    name: 'Sac à Main Milano',
    category: 'Maroquinerie',
    price: 890.00,
    stock: 8,
    description: 'Sac en cuir italien véritable, finitions artisanales, compartiments multiples',
    sku: 'BAG-MIL-004',
    vatRate: 0.20,
    images: ['/assets/leather/milano-bag.jpg'],
    isActive: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdBy: 'admin-seed'
  }
];

// Fonction pour créer les catégories
async function seedCategories() {
  console.log("--- Étape 1: Création des catégories ---");

  for (const category of testCategories) {
    try {
      await setDoc(doc(db, 'categories', category.id), category);
      console.log(`  -> ✅ Catégorie créée: ${category.name}`);
    } catch (error) {
      console.error(`  -> ❌ Erreur catégorie ${category.name}:`, error.message);
    }
  }
  console.log("--- Étape 1 terminée ---");
}

// Fonction pour créer les produits
async function seedProducts() {
    console.log("--- Étape 2: Création des produits ---");

  for (const product of testProducts) {
    try {
      const docRef = await addDoc(collection(db, 'products'), product);
      console.log(`  -> ✅ Produit créé: ${product.name} (ID: ${docRef.id})`);
    } catch (error) {
      console.error(`  -> ❌ Erreur produit ${product.name}:`, error.message);
    }
  }
  console.log("--- Étape 2 terminée ---");
}

// Fonction principale
async function seedFirestore() {
  console.log("\n🌱 === DÉBUT DE L'INITIALISATION DES DONNÉES ===\n");
  let success = false;

  try {
    await seedCategories();
    console.log("\nPetite pause d'une seconde...\n");
    await new Promise(resolve => setTimeout(resolve, 1000));
    await seedProducts();

    console.log("\n🎉 Données de test créées avec succès !");
    console.log("🔍 Vérifiez sur: http://localhost:4000/firestore");
    success = true;

  } catch (error) {
    console.error("💥 Erreur lors de l'initialisation:", error);
  } finally {
      console.log(`
--- Script terminé. Statut: ${success ? 'SUCCÈS' : 'ÉCHEC'} ---
`);
  }
}

// Lancer le script
seedFirestore();
