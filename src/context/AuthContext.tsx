import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { userType } from '../types/userType';
import {
  reauthenticateWithCredential,
  signInWithPopup,
  User,
} from 'firebase/auth';
import services from '../services';
import config from '../config';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth/web-extension';
import { deleteUserAuth } from '../services/authentication';

type contextType = {
  userState: boolean;
  setUserState: Dispatch<SetStateAction<boolean>>;
  googleUser: User | null;
  setGoogleUser: Dispatch<SetStateAction<User | null>>;
  user: userType | null;
  setUser: Dispatch<SetStateAction<userType | null>>;
};

interface IAuthContextProviderProp {
  children: React.ReactNode;
}
const AuthContext = createContext<contextType | null>(null);

export const AuthContextProvider: React.FC<IAuthContextProviderProp> = ({
  children,
}) => {
  const [userState, setUserState] = useState<boolean>(false);
  const [user, setUser] = useState<userType | null>(null);
  const [googleUser, setGoogleUser] = useState<User | null>(null);

  const revomeUser = async (password: string) => {
    let providerLogin = '';

    services.firetore.getDocumentByQuery('users', 'uid', '==', 'uid-value');
    const result = await services.firetore.getDocumentByQuery(
      'users',
      'uid',
      '==',
      'uid-value'
    );
    providerLogin = result?.docs[0].data().authProvider;

    if (providerLogin === 'local' && config.auth.currentUser?.email) {
      const credential = EmailAuthProvider.credential(
        config.auth.currentUser?.email,
        password
      );
      await reauthenticateWithCredential(config.auth.currentUser, credential);
      deleteUserAuth(config.auth.currentUser);
    }

    if (providerLogin === 'google' && config.auth.currentUser) {
      const result = await signInWithPopup(
        config.auth,
        config.googleAuthProvider
      );
      const googleCredential = GoogleAuthProvider.credentialFromResult(result);
      if (!googleCredential) {
        return;
      }
      await reauthenticateWithCredential(
        config.auth.currentUser,
        googleCredential
      );

      deleteUserAuth(config.auth.currentUser);
    }

    services.firetore.removeDocument('users', 'id');
    services.firetore.removeDocumentsByQuery('post', 'uid', '==', 'uid-value');
    services.firetore.removeDocumentsByQuery(
      'revision',
      'userAdded',
      '==',
      'uid-value'
    );
    services.storage.removeObjects(`/profile/user:uid`);
    services.storage.removeObjects(`/postContent/user:uid`);
  };

  return (
    <AuthContext.Provider
      value={{
        userState,
        setUserState,
        user,
        setUser,
        googleUser,
        setGoogleUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('There is no AuthContext provider');
  }
  return authContext;
};
