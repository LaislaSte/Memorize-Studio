import { updateProfile, User } from 'firebase/auth';
import { Slide, toast } from 'react-toastify';

export const updateProfileAuth = (
  user: User,
  imgURL: string,
  name_user: string
) => {
  const notification = toast.loading('Uptading auth profile...', {
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
  return updateProfile(user, {
    displayName: name_user,
    photoURL: imgURL,
  })
    .then(() => {
      toast.update(notification, {
        render: `User AuthProvider Profile updated`,
        type: 'success',
        isLoading: false,
        autoClose: 1000,
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
