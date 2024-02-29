
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import './App.css';
import Header from './Component/Header/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import AlertBox  from './Component/Authentication/AlertBox';


const useStyles = makeStyles({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
});

function App() {
 
  const classes = useStyles();
 
  return (
    <div className="App">
    
         <BrowserRouter>
              <div className={classes.App}>
                <Header />
                <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/coins/:id" element={<CoinPage />} />
                </Routes>
              </div>
              <AlertBox />
         </BrowserRouter>

    </div>
  );
}

export default App;
