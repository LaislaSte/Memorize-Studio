import { addDoc, collection } from 'firebase/firestore';
import { Slide, toast } from 'react-toastify';
import db from '../../config/Firestore';

export const addDocument = (collectionRefName: string, value: any) => {
  const collectionRef = collection(db, collectionRefName);
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

  return addDoc(collectionRef, value)
    .then(() => {
      toast.update(notification, {
        render: `Added document into ${collectionRefName} Collection`,
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
