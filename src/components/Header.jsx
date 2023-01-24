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
      <h1>Ark Price: {arkPrice}</h1>
    </header>
  );
};

export default Header;
