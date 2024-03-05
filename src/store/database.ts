import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCbllc8ZujjGqh-lX6A-eT1P8mz84Elz5A',
  authDomain: 'remainder-game.firebaseapp.com',
  projectId: 'remainder-game',
  storageBucket: 'remainder-game.appspot.com',
  messagingSenderId: '1047702888097',
  appId: '1:1047702888097:web:27c752e978272a999b5ae0',
};

export const app = initializeApp(firebaseConfig);

export const realtimeDb = getDatabase(app);
