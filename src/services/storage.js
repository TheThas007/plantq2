import { ref, uploadString, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';

export const uploadPlantImage = async (userId, imageData) => {
  try {
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    const storageRef = ref(storage, `plant-images/${userId}/${filename}`);
    
    // Check if it's a base64 data URL (from camera) or a File object (from upload)
    let snapshot;
    if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
      snapshot = await uploadString(storageRef, imageData, 'data_url');
    } else {
      snapshot = await uploadBytes(storageRef, imageData);
    }
    
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};
