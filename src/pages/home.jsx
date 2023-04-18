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
    accountsData && setAcctData(accountsData)
  }
  
  
  const getInitData = async () => {
    const savedData = [...new Set(JSON.parse(localStorage.getItem("arkFiWallets")))] || [];
    
    localStorage.setItem('arkFiWallets', JSON.stringify([...new Set([...savedData])]));
    const accountsData = [];
 for(const wallet of savedData) {
      const accountInfo = await initData([wallet]);
      if(savedData.includes(wallet)) {
        setAcctData(prev => prev.map(p => p.account === wallet ? accountInfo[0] : p))
      } 
   else {
        setAcctData(prev => [...prev, accountInfo[0]])
      }
      
   
   accountsData.push(accountInfo[0])
    }
    
    localStorage.setItem("arkFiAccountsData", JSON.stringify(accountsData))

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
    const wallets = JSON.parse(localStorage.getItem('arkFiWallets')) || []
    localStorage.setItem('arkFiWallets', JSON.stringify([...new Set([...wallets, address])]))
    
    const accountInfo = await initData([address]);
    
    setAcctData([...acctData, accountInfo[0]]);
    
  };
  
  const removeWallet = (address) => {
//     setOpenDialog(false);
//     if (!isConfirmed) {
//       return false;
//     }
    const stored = JSON.parse(localStorage.getItem("arkFiWallets"));
    const updated = stored.filter((w) => w !== address);
    localStorage.setItem("arkFiWallets", JSON.stringify(updated));
    
    const updatedAccountsData = acctData.filter(a => a.account !== address);
    localStorage.setItem("arkFiAccountsData", JSON.stringify(updatedAccountsData));
    setAcctData(updatedAccountsData)

//     window.location.reload(false);
  };

  return (
    <>
      <AddWallet addWallet={addWallet} />
      <AccountsTable accounts={acctData} />
    </>
  );
};
