import logInWithEmailAndPassword from './loginWithAuthProv';
import { signInWithGoogle } from './signInWithGoogleProv';
import { registerWithEmailAndPassword } from './signInWithAuthProv';
import { logOut } from './logout';
import { deleteUserAuth } from './removeCredentials';
import { updateUserEmail } from './updateEmail';
import { updateUserPassword } from './updatePassword';
import { updateProfileAuth } from './updateProfileAuth';

export {
  logInWithEmailAndPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
  logOut,
  deleteUserAuth,
  updateUserEmail,
  updateUserPassword,
  updateProfileAuth,
};
