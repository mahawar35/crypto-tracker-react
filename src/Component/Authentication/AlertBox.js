import React from 'react'
// import CryptoContext from '../../CryptoContext';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { CryptoState } from '../../CryptoContext';

const AlertBox = () => {
    const {alert, setAlert } = CryptoState();

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlert({open : false});
      };

  return (
    
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <Alert        
        onClose={handleCloseAlert}
        elevation={10}
        variant="filled"
        severity={alert.type}>
        {alert.message}
       </Alert>
      </Snackbar>

  )
}

export default AlertBox