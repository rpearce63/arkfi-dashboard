import { useState, useEffect } from "react";
import {getArkPrice} from "../api/utils"

const Header = () => {
  const [arkPrice, setArkPrice] = useState(0);

  const getUpdatedArkPrice = async () => {
    console.log('get ark price for header')
    const price = await getArkPrice();
    setArkPrice(price);
  };
  useEffect(() => {
    getUpdatedArkPrice();
    const priceInterval = setInterval(() => {
      getUpdatedArkPrice();
    }, 60000);
    return () => clearInterval(priceInterval)
  }, []);

  return (
    <header className="App-header">
      <h1 className="page-title">ArkFi Multi-Wallet Dashboard</h1>
      <h2 className="page-title">Ark Price: ${arkPrice}</h2>
    </header>
  );
};

export default Header;
