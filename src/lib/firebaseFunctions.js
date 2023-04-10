// aqui exportaras las funciones que necesites
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { auth, provider, db } from '../firebase/firebaseConfig.js';

export const createUserWithPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)}

export const loginGoogle = () => signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    // console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // console.log('error desde FB', error);
  });

export function authStateChangedEvent(cb) {
  onAuthStateChanged(auth, (user) => cb(user));
}

export const signOutUser = () => signOut(auth);

//Colección publicaciones

export const coleccPublic = collection(db, 'publicaciones');

export const listarPosts = async () => {
  const querySnapshot = await getDocs(coleccPublic);
  querySnapshot.forEach((document) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(document.id, ' => ', document.data());
  });
};

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
};