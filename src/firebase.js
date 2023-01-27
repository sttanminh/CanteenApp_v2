
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAR84wgvEA0dFv1_P_C1p4oCwBfy3n-zFg",
    authDomain: "canteendb-9148a.firebaseapp.com",
    databaseURL: "https://canteendb-9148a-default-rtdb.firebaseio.com",
    projectId: "canteendb-9148a",
    storageBucket: "canteendb-9148a.appspot.com",
    messagingSenderId: "74403538335",
    appId: "1:74403538335:web:ccf15f0470d459459349aa",
    measurementId: "G-HVNGG3VFWL"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db