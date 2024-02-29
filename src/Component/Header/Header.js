import React from 'react'
import { AppBar, Container, ThemeProvider, Toolbar, Typography, createTheme, Select, MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { CryptoState } from '../../CryptoContext';
import { Link } from 'react-router-dom';
import AuthModal from '../Authentication/AuthModal';
import UserSidebar from '../Authentication/UserSidebar';
const useStyles = makeStyles({
  title : {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  }
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type : 'dark'
  },
});

const Header = () => {

  const {currency, setCurrency, user} = CryptoState();
  // console.log(currency)

  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
             
              variant="h6"
              className={classes.title}
            >
              <Link to={`/`}>Crypto Hunter</Link>
              
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
            <Select
              className='curr-select'
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15, color: 'white', border : '1px solid #fff' }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
             {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header