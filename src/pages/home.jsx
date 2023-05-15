import React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AccountsTable from "../components/AccountsTable";
import AddWallet from "../components/AddWallet";
import { initData } from "../api/arkfi";

import Example from "../components/TheTable";

export default () => {
  const [acctData, setAcctData] = useState([]);
  const [loading, setLoading] = useState(false);

  const initializeData = async () => {
    const accountsData = JSON.parse(localStorage.getItem("arkFiAccountsData"));
    accountsData?.length && setAcctData(accountsData);
  };

  const getInitData = async () => {
    setLoading(true);
    const savedData =
      [...new Set(JSON.parse(localStorage.getItem("arkFiWallets")))] || [];
    localStorage.setItem(
      "arkFiWallets",
      JSON.stringify([...new Set([...savedData].map((t) => t.toLowerCase()))])
    );
    const accountsData = [];
    const startTime = new Date().getTime();
    for (const wallet of savedData) {
      //await new Promise((resolve) => setTimeout(resolve, 2000));
      const accountInfo = await initData([wallet]);
      accountsData.push(accountInfo[0]);
      if (accountInfo[0].deposits >= 0) {
        setAcctData((prev) => {
          if (
            prev.some((p) => p.account.toLowerCase() === wallet.toLowerCase())
          ) {
            return prev.map((p) =>
              p.account.toLowerCase() === wallet.toLowerCase()
                ? { ...p, ...accountInfo[0] }
                : p
            );
          } else {
            return [...prev, accountInfo[0]];
          }
        });
      }
    }
    const endTime = new Date().getTime();
    console.log(
      "data retrieved in " + (endTime - startTime) / 1000 + " seconds"
    );
    localStorage.setItem(
      "arkFiAccountsData",
      JSON.stringify(
        accountsData.map((a) => ({ ...a, account: a.account.toLowerCase() }))
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    initializeData();
    setTimeout(() => getInitData(), 2000);
    const interval = setInterval(() => {
      loading || getInitData();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const addWallet = async (address) => {
    if (acctData.some((a) => a.account.toLowerCase() === address.toLowerCase()))
      return;

    const wallets = JSON.parse(localStorage.getItem("arkFiWallets")) || [];
    localStorage.setItem(
      "arkFiWallets",
      JSON.stringify([...new Set([...wallets, address.toLowerCase()])])
    );

    const accountInfo = await initData([address]);
    localStorage.setItem(
      "arkFiAccountsData",
      JSON.stringify([...acctData, accountInfo[0]])
    );
    setAcctData([...acctData, accountInfo[0]]);
  };

  const removeWallet = (address) => {
    const stored = JSON.parse(localStorage.getItem("arkFiWallets"));
    const updated = stored.filter(
      (w) => w.toLowerCase() !== address.toLowerCase()
    );
    localStorage.setItem("arkFiWallets", JSON.stringify(updated));

    const updatedAccountsData = acctData.filter(
      (a) => a.account.toLowerCase() !== address.toLowerCase()
    );
    localStorage.setItem(
      "arkFiAccountsData",
      JSON.stringify(updatedAccountsData)
    );
    setAcctData(updatedAccountsData);
  };

  return (
    <>
      <AddWallet addWallet={addWallet} />
      <Example data={acctData} />
      {/* <AccountsTable accounts={acctData} removeAcct={removeWallet} /> */}
    </>
  );
};
