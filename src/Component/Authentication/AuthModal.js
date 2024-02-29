import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, Tabs, Tab } from '@mui/material';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { makeStyles } from '@mui/styles';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { CryptoState } from '../../CryptoContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: "white",
    borderRadius: 10,
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
}))

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const { setAlert } = CryptoState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(value)

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
     signInWithPopup(auth, googleProvider)
     .then((res)=>{
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${res.user.email}`,
        type: "success",
      });
      handleClose();
     })
     .catch((error)=>{
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
     })
  }
 
 

  return (
    <div>
      <Button 
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }} 
        onClick={handleOpen}>Login</Button>
      <Modal
        className='auth-modal'
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
        <Box className="auth-box" sx={style}>
           <AppBar>
         
           <Tabs 
           value={value} 
           onChange={handleChange} 
           variant="fullWidth" 
           style={{ borderRadius: 10 }}>
               <Tab label="Login"  />
               <Tab label="Sign Up" />
           </Tabs>
           </AppBar>
           {value === 0 && <Login handleClose={handleClose} /> }
           {value === 1 && <Signup handleClose={handleClose} /> }
           <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
           </Box>
           </div>
        </Fade>
      </Modal>
    </div>
  );
}