import { useState, useEffect } from "react";
import { getArkPrice } from "../api/utils";
import Countup from "react-countup";

const Header = () => {
  const [arkPrice, setArkPrice] = useState(0);

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

  return (
    <header className="App-header">
      <h1 className="page-title">ArkFi Multi-Wallet Dashboard</h1>
      <h1 className="page-title">
        Ark Price:{" "}
        <Countup
          start={0}
          end={arkPrice}
          decimals={2}
          duration={2}
          className="page-title"
          prefix="$"
        />
      </h1>
      <hr/>
    </header>
  );
};

export default Header;
