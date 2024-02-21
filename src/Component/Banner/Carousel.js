import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

// const handleDragStart = (e) => e.preventDefault();

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const Carousel = () => {
const myRef = useRef(null);
const [trending, setTrending] = useState([]);
const { currency, symbol } = CryptoState();

const fetchTrendingCoins = async () => {
  const { data } = await axios.get(TrendingCoins(currency))
  setTimeout(() => {
    console.log(data)
    setTrending(data);
  },1000);

  // if (data.status === 429) {
  //    console.log("error")
  // }
};



// async function fetchTrendingCoins() {
  
//   const response = await fetch(TrendingCoins(currency));
//   const data = await response.json();
//   setTimeout(() => {
//     setTrending(data);
//   },1000);
// }

useEffect(() => {
  
  if (myRef.current) {
    fetchTrendingCoins();
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[currency]);

const useStyle = makeStyles({
  carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
});
const classes = useStyle();

const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
        <Link 
        ref={myRef} 
        className={classes.carouselItem} to={`/coins/${coin.id}`}>
            <img 
            src={coin?.image} 
            alt={coin.image}
            height="80"
            style={{ marginBottom: 10 }}
           />
           <span>{coin?.symbol}
           &nbsp;
           <span>
            {profit && "+"} {coin?.price_change_percentage_24h.toFixed(2)}%
           </span>
           </span>
           <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
        </Link>
    )
})

const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
        <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay />
    </div>
  )
}

export default Carousel