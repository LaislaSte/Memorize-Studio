import { signOut } from 'firebase/auth';
import auth from '../../config/AuthProvider';
import { useToast } from '../../hooks/useToast';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const logOut = () => {
  const { setUser, setUserState, setGoogleUser } = useAuthContext();
  const navigate = useNavigate();
  return signOut(auth)
    .then(() => {
      setGoogleUser(null);
      setUser(null);
      setUserState(false);
      useToast({
        initailMessage: 'Logout',
        updatedMessage: `Logged out`,
        type: 'success',
      });
      navigate('/');
    })
    .catch((err) => {
      useToast({
        initailMessage: 'Logout',
        updatedMessage: `Error: ${err.code}, ${err.message}`,
        type: 'error',
      });
    });
};
