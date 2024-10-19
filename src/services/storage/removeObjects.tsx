import { deleteObject, listAll, ref } from 'firebase/storage';
import storage from '../../config/Storage';
import { Slide, toast } from 'react-toastify';

export const removeObjects = (objectRef: string) => {
  const postsRef = ref(storage, objectRef);
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

  return listAll(postsRef)
    .then((res) => {
      res.items.forEach(async (itemRef) => {
        if (itemRef !== null) {
          const imgRef = ref(storage, itemRef.fullPath);
          await deleteObject(imgRef);
        }
      });
      toast.update(notification, {
        render: 'Objects deleted',
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
