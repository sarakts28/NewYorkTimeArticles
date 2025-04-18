import { Snackbar, Alert, AlertColor } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';

export type AlertNotificationHandle = {
  showAlert: (message: string, severity?: AlertColor) => void;
};

const AlertNotification = forwardRef<AlertNotificationHandle>((_, ref) => {
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Expose the showAlert function via ref
  useImperativeHandle(ref, () => ({
    showAlert: (message: string, severity: AlertColor = 'success') => {
      setAlert({
        open: true,
        message,
        severity,
      });
    },
  }));

  const handleClose = () => {
    setAlert(prev => ({ ...prev, open: false }));
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
});

AlertNotification.displayName = 'AlertNotification';

export default AlertNotification;