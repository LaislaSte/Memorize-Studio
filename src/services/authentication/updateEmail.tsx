import { updateEmail } from 'firebase/auth';
import config from '../../config';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const updateUserEmail = (email: string, password: string) => {
  // const credential = EmailAuthProvider.credential(
  //   auth.currentUser.email,
  //   password
  // );
  // await reauthenticateWithCredential(auth.currentUser, credential);
  const navigate = useNavigate();

  const notification = toast.loading('Uptading auth email...', {
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

  if (config.auth.currentUser)
    return updateEmail(config.auth.currentUser, email)
      .then(() => {
        toast.update(notification, {
          render: `User AuthProvider Email updated`,
          type: 'success',
          isLoading: false,
          autoClose: 1000,
        });
        navigate('/config');
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
