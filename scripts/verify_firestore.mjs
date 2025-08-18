// Script pour vérifier les données dans Firestore Emulator
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  connectFirestoreEmulator, 
  collection, 
  getDocs, 
  doc, 
  getDoc 
} from 'firebase/firestore';

// Configuration Firebase (remplacez par votre config)
const firebaseConfig = {
  projectId: "dreampos-94155",
  // Autres configs...
};

// Initialisation
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Connexion à l'émulateur (SEULEMENT en dev)
if (process.env.NODE_ENV !== 'production') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8180);
    console.log('🔗 Connecté à l\'émulateur Firestore sur localhost:8180');
  } catch (error) {
    console.log('⚠️ Émulateur déjà connecté ou erreur:', error.message);
  }
}

// Fonction pour vérifier toutes les collections
async function checkAllCollections() {
  console.log('n🔍 === VÉRIFICATION FIRESTORE EMULATOR ===n');
  
  const collectionsToCheck = ['products', 'categories', 'orders', 'customers'];
  
  for (const collectionName of collectionsToCheck) {
    try {
      const colRef = collection(db, collectionName);
      const snapshot = await getDocs(colRef);
      
      console.log(`📁 Collection "${collectionName}": ${snapshot.size} documents`);
      
      if (snapshot.size > 0) {
        snapshot.forEach((doc) => {
          console.log(`   📄 ${doc.id}:`, JSON.stringify(doc.data(), null, 2));
        });
      } else {
        console.log(`   ❌ Aucun document trouvé`);
      }
      console.log('');
      
    } catch (error) {
      console.error(`❌ Erreur collection "${collectionName}":`, error.message);
    }
  }
}

// Fonction pour vérifier un document spécifique
async function checkSpecificProduct(productId) {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log(`✅ Produit ${productId} trouvé:`, docSnap.data());
    } else {
      console.log(`❌ Produit ${productId} non trouvé`);
    }
  } catch (error) {
    console.error('Erreur:', error.message);
  }
}

// Fonction pour vérifier la connectivité
async function testConnection() {
  try {
    const testCol = collection(db, 'test');
    await getDocs(testCol);
    console.log('✅ Connexion à Firestore OK');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    return false;
  }
}

// Exécution principale
async function main() {
  const isConnected = await testConnection();
  
  if (isConnected) {
    await checkAllCollections();
    
    // Exemple: vérifier un produit spécifique
    // await checkSpecificProduct('product-123');
  }
}

// Lancer le script
main().catch(console.error);

export { checkAllCollections, checkSpecificProduct, testConnection };
