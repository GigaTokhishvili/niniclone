import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZ2_-AXPTtfTkAtY4OqTWYspcXyhHL12Y",
  authDomain: "ninaka-photography.firebaseapp.com",
  projectId: "ninaka-photography",
  storageBucket: "ninaka-photography.appspot.com",
  messagingSenderId: "226108744089",
  appId: "1:226108744089:web:a76e7684e80ecb0c963308",
  measurementId: "G-C0LZFGN9EM"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();
