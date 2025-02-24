import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBJP8qxW-zPR1bgi6GnJ6PD-B60pyKidhE",
    authDomain: "chat-app-34513.firebaseapp.com",
    projectId: "chat-app-34513",
    storageBucket: "chat-app-34513.firebasestorage.app",
    messagingSenderId: "828979963642",
    appId: "1:828979963642:web:547f295d8e5aecd42d4b43"
  }

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }