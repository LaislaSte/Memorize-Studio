import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../config/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';
import { addDocument } from '../firestore/addDocument';
import { userType } from '../../types/userType';
import uuid from 'uuid';

export const registerWithEmailAndPassword = (
  email: string,
  password: string
) => {
  const navigate = useNavigate();
  const { setUserState, setUser } = useAuthContext();

  const notification = toast.loading('Signing in...', {
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

  return createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
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
      navigate('/explore');
    })
    .catch((err) => {
      toast.update(notification, {
        render: `${err.code}, ${err.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 1000,
      });
    });
};
