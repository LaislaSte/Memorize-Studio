import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '../../config/Storage';
import { Slide, toast } from 'react-toastify';

export const addObject = (refPath: string, file: File) => {
  const notification = toast.loading('Uploading object to storage', {
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

  const postRef = ref(storage, refPath);

  const uploadTask = uploadBytesResumable(postRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      toast.update(notification, {
        render: `${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}`,
        type: 'info',
        isLoading: true,
        autoClose: 1000,
      });
    },
    (error) => {
      toast.update(notification, {
        render: `Error: ${error.code}, ${error.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 1000,
      });
    },
    () => {
      toast.update(notification, {
        render: `Upload complete`,
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      });
    }
  );

  return getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    return url;
  });
};
