// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAU8C54W1DJ2uZvdPpYS91Jjx1t-PbtnpY',
  authDomain: 'my-project-b4cc7.firebaseapp.com',
  projectId: 'my-project-b4cc7',
  storageBucket: 'my-project-b4cc7.appspot.com',
  messagingSenderId: '143686264023',
  appId: '1:143686264023:web:59b94f1f82a59ed8a43c92',
  measurementId: 'G-JTMB3Q0LGN'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
