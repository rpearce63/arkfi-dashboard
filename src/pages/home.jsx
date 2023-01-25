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
  const [addresses, setAddresses] = useState([]);

  const getInitData = async () => {
    console.log("getting data: ", addresses);
    const accountInfo = await initData(addresses);

    setAcctData([...accountInfo]);
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("arkFiWallets"));
    savedData && setAddresses([...savedData]);
    setInterval(() => {
      getInitData();
    }, 60000);
  }, []);

  useEffect(() => {
    getInitData();
    localStorage.setItem("arkFiWallets", JSON.stringify(addresses));
  }, [addresses]);

  const addWallet = (address) => {
    setAddresses([...new Set([...addresses, address])]);
  };

  return (
    <div>
      <AddWallet addWallet={addWallet} />
      <AccountsTable accounts={acctData} />
    </div>
  );
};
