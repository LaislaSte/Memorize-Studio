import { collection, getDocs, query, where } from 'firebase/firestore';
import { signInWithPopup } from 'firebase/auth';

import auth from '../../config/AuthProvider';
import googleAuthProvider from '../../config/GoogleAuthProvider';
import { useAuthContext } from '../../context/AuthContext';
import db from '../../config/Firestore';
import uuid from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import { userType } from '../../types/userType';
import { addDocument } from '../firestore/addDocument';

export const signInWithGoogle = () => {
  const { setGoogleUser, setUser, setUserState } = useAuthContext();
  const collectionRef = collection(db, 'users');
  const navigate = useNavigate();
  const notification = toast.loading('Loggin...', {
    position: 'top-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 1,
    theme: 'dark',
    transition: Slide,
  });

  return signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      setGoogleUser(result.user);

      const q = query(collectionRef, where('uid', '==', result.user.uid));

      getDocs(q).then((resultGet) => {
        if (resultGet.docs.length === 0) {
          const newUser: userType = {
            uid: uuid.v7,
            name: `user${uuid.v1}`,
            authProvider: 'google',
            email: result.user.email,
            avatar: result.user.photoURL,
            following: [],
            followers: [],
            arrCategorys: [],
          };
          addDocument('users', newUser);
          setUser(newUser);
          setUserState(true);
          toast.update(notification, {
            render: `User Looged by Google Provider`,
            type: 'success',
            isLoading: false,
            autoClose: 1000,
          });
        }

        navigate('/explore');
      });
    })
    .catch((error) => {
      toast.update(notification, {
        render: `${error.code}, ${error.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 1000,
      });
    });
};
