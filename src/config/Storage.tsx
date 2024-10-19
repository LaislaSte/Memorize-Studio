import { getStorage } from 'firebase/storage';
import app from './FirebaseApp';

const storage = getStorage(app);
export default storage;
