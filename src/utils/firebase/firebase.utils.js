import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAzegV40oTSao86-mqDWxO1RZqZ34Imhds",
    authDomain: "zanzea-clothing-db.firebaseapp.com",
    projectId: "zanzea-clothing-db",
    storageBucket: "zanzea-clothing-db.appspot.com",
    messagingSenderId: "709496734390",
    appId: "1:709496734390:web:9acf7eb63679c0e1ef5c17"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef =  doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt
            });
        }
        catch (error){
            console.log('error creating the user', error);
        }
    }

    return userDocRef;
}