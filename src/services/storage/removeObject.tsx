import { deleteObject, ref } from 'firebase/storage';
import storage from '../../config/Storage';
import { Slide, toast } from 'react-toastify';

export const removeObject = (itemRef: string) => {
  const notification = toast.loading('Deleting object storage', {
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

  const imgRef = ref(storage, itemRef);
  return deleteObject(imgRef)
    .then(() => {
      toast.update(notification, {
        render: 'Object deleted',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      });
    })
    .catch((error) => {
      toast.update(notification, {
        render: `Error: ${error.code}, ${error.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 1000,
      });
    });
};
