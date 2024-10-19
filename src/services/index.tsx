import { addObject, removeObject, removeObjects } from './storage';
import {
  addDocument,
  updateDocument,
  getDocuments,
  getDocumentByQuery,
  removeDocument,
  removeDocumentsByQuery,
} from './firestore';

import {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  signInWithGoogle,
  logOut,
  deleteUserAuth,
  updateProfileAuth,
  updateUserEmail,
  updateUserPassword,
} from './authentication';

export default {
  authProviders: {
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
    signInWithGoogle,
    logOut,
    updateProfileAuth,
    updateUserEmail,
    updateUserPassword,
  },
  firetore: {
    addDocument,
    updateDocument,
    getDocuments,
    getDocumentByQuery,
    removeDocument,
    removeDocumentsByQuery,
    deleteUserAuth,
  },
  storage: { addObject, removeObject, removeObjects },
};
