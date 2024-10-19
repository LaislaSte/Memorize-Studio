import { deleteUser, User } from 'firebase/auth';
import { Slide, toast } from 'react-toastify';

export const deleteUserAuth = (currentUser: User) => {
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

  deleteUser(currentUser)
    .then(() => {
      toast.update(notification, {
        render: `Detelet user from Auth Provider`,
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      });
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
