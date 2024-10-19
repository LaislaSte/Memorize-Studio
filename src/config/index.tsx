import db from './Firestore';
import storage from './Storage';
import auth from './AuthProvider';
import googleAuthProvider from './GoogleAuthProvider';

export default { db, storage, googleAuthProvider, auth };
