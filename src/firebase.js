import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/database";
import "firebase/firestore";
import firebaseConfig from "./firebase-config.json";

firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true });

export const auth = firebase.auth();
// export const database = firebase.database();
 
export default firebase;
