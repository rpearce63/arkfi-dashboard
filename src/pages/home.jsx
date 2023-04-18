import React from "react";
import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import AccountsTable from "../components/AccountsTable";
import AddWallet from "../components/AddWallet";
import { initData } from "../api/arkfi";

export default () => {
  

  const [acctData, setAcctData] = useState([]);

  
  const initializeData = async () => {
    const accountsData = JSON.parse(localStorage.getItem("arkFiAccountsData"));
    accountsData?.length && setAcctData(accountsData)
  }
  
  
  const getInitData = async () => {
    const savedData = [...new Set(JSON.parse(localStorage.getItem("arkFiWallets")))] || [];
    
    localStorage.setItem('arkFiWallets', JSON.stringify([...new Set([...savedData])]));
    const accountsData = [];
    for(const wallet of savedData) {
      const accountInfo = await initData([wallet]);
      if(savedData.includes(wallet)) {
        setAcctData(prev => prev.map(p => p.account === wallet ? accountInfo[0] : p))
      } else {
       accountsData.push(accountInfo[0]);
       localStorage.setItem("arkFiAccountsData", JSON.stringify(accountsData));
      setAcctData(prev => [...prev, accountInfo[0]])
      }

    }


  };

  useEffect(() => {
    initializeData(); 
    setTimeout(() => getInitData(), 5000)
    const interval = setInterval(() => {
      getInitData();
      return () => clearInterval(interval);
    }, 300000)
  }, []);
  
  
  const addWallet = async (address) => {
    if(acctData.some(a => a.account.toLowerCase() === address.toLowerCase())) return;
    
    const wallets = JSON.parse(localStorage.getItem('arkFiWallets')) || []
    localStorage.setItem('arkFiWallets', JSON.stringify([...new Set([...wallets, address.toLowerCase()])]))
    
    const accountInfo = await initData([address]);
    localStorage.setItem("arkFiAccountsData", JSON.stringify([...acctData, accountInfo[0]]));
    setAcctData([...acctData, accountInfo[0]]);
    
    
  };
  
  

  return (
    <>
      <AddWallet addWallet={addWallet} />
      <AccountsTable accounts={acctData} />
    </>
  );
};
