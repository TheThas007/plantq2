import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

// --- USER SCANS ---
export const savePlantScan = async (userId, plantData) => {
  try {
    const docRef = await addDoc(collection(db, 'plants'), {
      userId,
      ...plantData,
      scanDate: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getUserPlants = async (userId) => {
  try {
    const q = query(
      collection(db, 'plants'), 
      where('userId', '==', userId),
      orderBy('scanDate', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const plants = [];
    querySnapshot.forEach((doc) => {
      plants.push({ id: doc.id, ...doc.data() });
    });
    return plants;
  } catch (error) {
    throw error;
  }
};

// --- MARKET PRICES ---
export const getMarketPrices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'marketPrices'));
    const prices = [];
    querySnapshot.forEach((doc) => {
      prices.push({ id: doc.id, ...doc.data() });
    });
    return prices;
  } catch (error) {
    throw error;
  }
};

export const addMarketPrice = async (data) => {
  try {
    return await addDoc(collection(db, 'marketPrices'), data);
  } catch (error) {
    throw error;
  }
};

export const updateMarketPrice = async (id, data) => {
  try {
    const docRef = doc(db, 'marketPrices', id);
    await updateDoc(docRef, data);
  } catch (error) {
    throw error;
  }
};

export const deleteMarketPrice = async (id) => {
  try {
    const docRef = doc(db, 'marketPrices', id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

// --- ENCYCLOPEDIA ---
export const getEncyclopediaPlants = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'encyclopedia'));
    const plants = [];
    querySnapshot.forEach((doc) => {
      plants.push({ id: doc.id, ...doc.data() });
    });
    return plants;
  } catch (error) {
    throw error;
  }
};

export const addEncyclopediaPlant = async (data) => {
  try {
    return await addDoc(collection(db, 'encyclopedia'), data);
  } catch (error) {
    throw error;
  }
};

export const updateEncyclopediaPlant = async (id, data) => {
  try {
    const docRef = doc(db, 'encyclopedia', id);
    await updateDoc(docRef, data);
  } catch (error) {
    throw error;
  }
};

export const deleteEncyclopediaPlant = async (id) => {
  try {
    const docRef = doc(db, 'encyclopedia', id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};


// --- USERS & FORUM ---
export const updateUserLanguage = async (userId, lang) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      preferredLanguage: lang
    });
  } catch (error) {
    throw error;
  }
};

export const createCommunityPost = async (userId, userName, title, content) => {
  try {
    const docRef = await addDoc(collection(db, 'forum'), {
      userId,
      userName,
      title,
      content,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getCommunityPosts = async () => {
  try {
    const q = query(
      collection(db, 'forum'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

// --- AGRICULTURE NEWS ---
export const getAgriNews = async () => {
  try {
    const q = query(
      collection(db, 'agriNews'),
      orderBy('publishedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const news = [];
    querySnapshot.forEach((doc) => {
      news.push({ id: doc.id, ...doc.data() });
    });
    return news;
  } catch (error) {
    throw error;
  }
};

export const addAgriNews = async (data) => {
  try {
    return await addDoc(collection(db, 'agriNews'), {
      ...data,
      publishedAt: new Date().toISOString()
    });
  } catch (error) {
    throw error;
  }
};

export const updateAgriNews = async (id, data) => {
  try {
    const docRef = doc(db, 'agriNews', id);
    await updateDoc(docRef, data);
  } catch (error) {
    throw error;
  }
};

export const deleteAgriNews = async (id) => {
  try {
    const docRef = doc(db, 'agriNews', id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

// --- LEARNING ARTICLES ---
import { LEARNING_ARTICLES_SEED } from '../data/learningSeed';

export const getLearningArticles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'learningArticles'));
    const articles = [];
    querySnapshot.forEach((doc) => {
      articles.push({ id: doc.id, ...doc.data() });
    });
    return articles;
  } catch (error) {
    throw error;
  }
};

export const addLearningArticle = async (data) => {
  try {
    return await addDoc(collection(db, 'learningArticles'), {
      ...data,
      publishedAt: serverTimestamp()
    });
  } catch (error) {
    throw error;
  }
};

export const seedLearningArticles = async () => {
  try {
    // Check if already seeded
    const existing = await getLearningArticles();
    if (existing.length === 0) {
      console.log("Seeding Learning Articles...");
      for (const article of LEARNING_ARTICLES_SEED) {
        await addLearningArticle(article);
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error seeding learning articles:", error);
    throw error;
  }
};
