import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: 'auth-domain',
  databaseURL: 'database-url',
  projectId: 'project-id',
  storageBucket: 'bucket',
  messagingSenderId: 'messagin-sender-id',
  appId: 'app-id',
  measurementId: 'measurement-id',
};

const app = initializeApp(firebaseConfig);
export default app;
