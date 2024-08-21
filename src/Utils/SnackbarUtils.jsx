import { useSnackbar } from 'notistack';

let useSnackbarRef;
export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const Snackbar = (msg, options = {}) => {
  useSnackbarRef.enqueueSnackbar(msg, options);
};
