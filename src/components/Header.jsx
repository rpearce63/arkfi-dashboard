import { useState, useEffect } from "react";
import { getArkPrice } from "../api/utils";

const Header = () => {
  const [arkPrice, setArkPrice] = useState(0);
  const [displayPrice, setDisplayPrice] = useState(0);

  const getUpdatedArkPrice = async () => {
    const price = await getArkPrice();
    setArkPrice(price);
  };
  useEffect(() => {
    getUpdatedArkPrice();
    const priceInterval = setInterval(() => {
      getUpdatedArkPrice();
    }, 60000);
    return () => clearInterval(priceInterval);
  }, []);

  useEffect(() => {
    const increment = setInterval(() => {
      console.log('arkPrice: ', arkPrice)
      setDisplayPrice((prev) => {
         return prev + 0.01;
      });
      return () => clearInterval(increment);
    }, 1000);
  }, [arkPrice]);

  return (
    <header className="App-header">
      <h1 className="page-title">ArkFi Multi-Wallet Dashboard</h1>
      <h2 className="page-title">Ark Price: ${displayPrice}</h2>
    </header>
  );
};

export default Header;
