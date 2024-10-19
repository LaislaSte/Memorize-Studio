import { getFirestore } from 'firebase/firestore';
import app from './FirebaseApp';

const db = getFirestore(app);

export default db;
