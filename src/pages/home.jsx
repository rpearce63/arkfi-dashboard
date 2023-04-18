import React from "react";
import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import AccountsTable from "../components/AccountsTable";
import AddWallet from "../components/AddWallet";
import { initData } from "../api/arkfi";

export default () => {
  

  const [acctData, setAcctData] = useState([]);

  const getInitData = async () => {
    const savedData = [...new Set(JSON.parse(localStorage.getItem("arkFiWallets")))] || [];
    localStorage.setItem('arkFiWallets', JSON.stringify([...new Set([...savedData])]))
//     for(const account of savedData) {
//    const accountInfo = await initData(account);

//     accountInfo.length && setAcctData([...acctData, accountInfo[0]]);
//  }
    const accountInfo = await initData(savedData);

    accountInfo.length && setAcctData([...accountInfo]);
  };

  useEffect(() => {
    getInitData();
    const interval = setInterval(() => {
      getInitData();
      return () => clearInterval(interval);
    }, 300000)
  }, []);
  
  
  const addWallet = (address) => {
    const wallets = JSON.parse(localStorage.getItem('arkFiWallets')) || []
    localStorage.setItem('arkFiWallets', JSON.stringify([...new Set([...wallets, address])]))
    getInitData();
    
  };
  
  const removeWallet = (address) => {
//     setOpenDialog(false);
//     if (!isConfirmed) {
//       return false;
//     }
    const stored = JSON.parse(localStorage.getItem("arkFiWallets"));
    const updated = stored.filter((w) => w !== address);
    localStorage.setItem("arkFiWallets", JSON.stringify(updated));
    getInitData();

//     window.location.reload(false);
  };

  return (
    <>
      <AddWallet addWallet={addWallet} />
      <AccountsTable accounts={acctData} />
    </>
  );
};
