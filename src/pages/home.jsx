import React from "react";
import { useEffect, useState } from "react";

import AccountsTable from "../components/AccountsTable";
import AddWallet from "../components/AddWallet";
import { initData } from "../api/arkfi";

export default () => {
  
  const accounts = [
  "0x1ff661243cb97384102a69a466c887b4cC12d72a",
  "0xb066550524e791c41672178975febb4e7038a3f8",
];
  
  
  const [acctData, setAcctData] = useState([]);
  const [addresses, setAddresses] = useState([])
  
  const getInitData = async () => {
    const accountInfo = await initData(addresses);

    setAcctData([...accountInfo]);
  };

  useEffect(() => {
    getInitData();
    setInterval(() => {
      getInitData();
    }, 60000);
  }, []);
  
  const addWallet = (address) => {
    setAddresses([...addresses, address])
  }
  
  return (
    <div>
      <AddWallet addWallet={addWallet}/>
      <AccountsTable accounts={acctData}/>
    </div>
  );
};
