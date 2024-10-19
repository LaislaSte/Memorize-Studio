import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../config/AuthProvider';
import { useToast } from '../../hooks/useToast';

const navigate = useNavigate();

const logInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      if (!result) {
        useToast({
          initailMessage: 'Login',
          updatedMessage: 'Loggin falied',
          type: 'error',
        });
        navigate('/login');
        return;
      }
      useToast({
        initailMessage: 'Login',
        updatedMessage: `User ${result.user.displayName} logged in`,
        type: 'success',
      });
      navigate('explore');
    })
    .catch((err) => {
      useToast({
        initailMessage: 'Login',
        updatedMessage: `${err.code}, ${err.message}`,
        type: 'error',
      });
    });
};

export default logInWithEmailAndPassword;
