import { Slide, toast, TypeOptions } from 'react-toastify';

type useToastProp = {
  type: TypeOptions | null | undefined;
  initailMessage: string;
  updatedMessage: string;
};
export const useToast = ({
  initailMessage,
  updatedMessage,
  type,
}: useToastProp) => {
  const notification = toast.loading(initailMessage, {
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

  return toast.update(notification, {
    render: updatedMessage,
    type: type,
    isLoading: false,
    autoClose: 1000,
  });
};
