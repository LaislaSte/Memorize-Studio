import { doc, updateDoc } from 'firebase/firestore';
import { Slide, toast } from 'react-toastify';
import db from '../../config/Firestore';

export const updateDocument = (
  collectionRefName: string,
  id: string,
  newValue: any
) => {
  const notification = toast.loading('Updating Document...', {
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

  return updateDoc(doc(db, collectionRefName, id), newValue)
    .then(() => {
      toast.update(notification, {
        render: `Document updated`,
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      });
    })
    .catch((err) => {
      toast.update(notification, {
        render: `Error: ${err}`,
        type: 'error',
        isLoading: false,
        autoClose: 1000,
      });
    });
};
