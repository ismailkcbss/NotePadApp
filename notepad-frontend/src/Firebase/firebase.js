import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCKMdkJ9NnLqPMU6KxAxnJ6sJD13YO82ME",
  authDomain: "notepadapp-96bda.firebaseapp.com",
  projectId: "notepadapp-96bda",
  storageBucket: "notepadapp-96bda.appspot.com",
  messagingSenderId: "989534226126",
  appId: "1:989534226126:web:375705475060afab2e729f",
  measurementId: "G-LW2MGB9ZQG"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);