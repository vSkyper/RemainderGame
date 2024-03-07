import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCbllc8ZujjGqh-lX6A-eT1P8mz84Elz5A',
  authDomain: 'remainder-game.firebaseapp.com',
  databaseURL:
    'https://remainder-game-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'remainder-game',
  storageBucket: 'remainder-game.appspot.com',
  messagingSenderId: '1047702888097',
  appId: '1:1047702888097:web:45a419f79ef4b8529b5ae0',
};

export const app = initializeApp(firebaseConfig);

export const firesoreDb = getFirestore(app);

export const realtimeDb = getDatabase();
