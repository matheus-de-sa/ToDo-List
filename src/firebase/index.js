import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";

const FirebaseApp = initializeApp({
    apiKey: 'AIzaSyCaMYGMtP0yDrCo_IotelPdVN2PQ2b40D4',
    authDomain: 'todolist-4ab9a.firebaseapp.com',
    projectId: 'todolist-4ab9a',
    storageBucket: 'todolist-4ab9a.appspot.com',
    messagingSenderId: '667733479447',
    appId: '1:667733479447:web:a245353dc411faa59acc52'
})

const analytics = getAnalytics(FirebaseApp);

export default FirebaseApp
