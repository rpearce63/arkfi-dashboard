import { useState, useEffect } from "react";
import { GetArkPrice_Swap } from "../api/arkfi";

const Header = () => {
  const [arkPrice, setArkPrice] = useState(0);

  const getArkPrice = async () => {
    const price = await GetArkPrice_Swap();
    setArkPrice(price);
  };
  useEffect(() => {
    getArkPrice();
    setInterval(() => {
      getArkPrice();
    }, 60000);
  }, []);

  return (
    <header className="App-header">
      <h1 className="page-title">ArkFi Multi-Wallet Dashboard</h1>
      <h2 className="page-title">Ark Price: ${arkPrice}</h2>
    </header>
  );
};

export default Header;
