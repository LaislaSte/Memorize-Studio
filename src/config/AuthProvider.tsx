import { getAuth } from 'firebase/auth';
import app from './FirebaseApp';
const auth = getAuth(app);

export default auth;
