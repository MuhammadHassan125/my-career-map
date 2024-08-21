// toastUtils.js
import { toast } from 'react-toastify';

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const ToastSuccess = (message) => {
  toast.success(message, toastOptions);
};

export const ToastError = (message) => {
  toast.error(message, toastOptions);
};

export const ToastInfo = (message) => {
  toast.info(message, toastOptions);
};

export const ToastWarning = (message) => {
  toast.warning(message, toastOptions);
};
