import config from '../../config';
import services from '..';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';

export const updateUserPassword = async (email: string) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const notification = toast.loading('Uptading auth password...', {
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

  let currentEmail = null;
  if (!user) {
    const result = await services.firetore.getDocumentByQuery(
      'users',
      'email',
      '==',
      email
    );
    currentEmail = result?.docs[0].data().email;
    if (!currentEmail) {
      toast.update(notification, {
        render: 'There is no email like this registered',
        type: 'error',
        isLoading: false,
        autoClose: 1000,
      });
      return;
    }
  } else {
    currentEmail = config.auth.currentUser?.email;
  }

  sendPasswordResetEmail(config.auth, currentEmail)
    .then(() => {
      toast.update(notification, {
        render: `User AuthProvider Password redefinition email send `,
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      });
      navigate('/login');
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
