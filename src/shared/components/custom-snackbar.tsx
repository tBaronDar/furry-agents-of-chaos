import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';

export type CustomSnackbarProps = {
  message?: string;
};

export default function CustomSnackbar(props: CustomSnackbarProps) {
  const [open, setOpen] = useState(false);
  const { message } = props;
  useEffect(() => {
    setOpen(true);
  }, [message]);
  return (
    <Snackbar
      slots={{ transition: Slide }}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert severity='error'>{message}</Alert>
    </Snackbar>
  );
}
