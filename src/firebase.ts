import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD0g8RoogYOzifeJx5YTU2iFP6cOQLFf-s",
    authDomain: "chat-app-34513.firebaseapp.com",
    projectId: "chat-app-34513",
    storageBucket: "chat-app-34513.firebasestorage.app",
    messagingSenderId: "828979963642",
    appId: "1:828979963642:web:80dfddc6e1611aa72d4b43"  
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth}