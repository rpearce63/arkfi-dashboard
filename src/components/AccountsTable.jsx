import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Switch from '@mui/material/Switch';
import {GetArkPrice_Swap, backupData} from '../api/arkfi';
import ConfirmationDialog from './ConfirmationDialog';
import Button from '@mui/material/Button';
import Controls from './Controls';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


function Timer(toDate) {
  var dateEntered = toDate + 86400000;
  var now = new Date();
  var difference = dateEntered - now.getTime();

  if (difference <= 0) {
    //$("#vaulttimer").text("00:00:00");
    //clearInterval(rewardsTimer);
    const haltTimer = true;
    return "00:00:00";
  } else {
    var seconds = Math.floor(difference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    const hourText = hours < 10 ? "0" + hours : hours;
    const minutesText = minutes < 10 ? "0" + minutes : minutes;
    const secondsText = seconds < 10 ? "0" + seconds : seconds;
    return hourText + ":" + minutesText + ":" + secondsText;
  }
}

export default function AccountsTable({ accounts }) {
  const [totals, setTotals] = useState([]);
  const [timers, setTimers] = useState([]);
  const [selected, setSelected] = React.useState(false);
  const [isBusd, setIsBusd] = useState(false);
  const [arkPrice, setArkPrice] = useState(0)
  //const [wallets, setWallets] = useState([]);
  //const [confirm, setConfirm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState('');
  
  const updateTimers = () => {
    let _timers = {};
    for (const account of accounts) {
      const timer = Timer(account.lastAction);
      _timers = { ..._timers, [account.account]: timer };
    }

    setTimers(_timers);
  };
  
  useEffect(() => {
    const getArkPrice = async () => {
      //setWallets(() => [...accounts]);
      const arkPrice = await GetArkPrice_Swap();
      setArkPrice(arkPrice);
    }
    getArkPrice();
    
  }, [])

  useEffect(() => {
    const balanceTotal = accounts.reduce(
      (total, account) => total + parseFloat(account.principalBalance),
      0
    );
    const walletTotal = accounts.reduce(
      (total, account) => total + parseFloat(account.walletBalance),
      0
    );
    const busdTotal = accounts.reduce(
      (total, account) => total + parseFloat(account.busdBalance),
      0
    );
    const availTotal = accounts.reduce(
      (total, account) => total + parseFloat(account.availableRewards),
      0
    );
    const depositsTotal = accounts.reduce(
      (total, account) => total + parseFloat(account.deposits),
      0
    );
    const maxPayoutTotal = accounts.reduce(
      (total, account) => total + parseFloat(account.maxPayout),
      0
    );
    const nftRewardsTotal = accounts.reduce(
      (total, account) => total + parseFloat(account.nftRewards),
      0
    );
    const airdropsReceivedTotal = accounts.reduce(
      (total, account) => total + parseFloat(account.airdropsReceived),
      0
    );
    setTotals({
      ...totals,
      balanceTotal,
      walletTotal,
      busdTotal,
      availTotal,
      depositsTotal,
      maxPayoutTotal,
      nftRewardsTotal,
      airdropsReceivedTotal
    });

    const timerInterval = setInterval(() => {
      updateTimers();
      return () => clearInterval(timerInterval);
    }, 1000);
    
    
  }, [accounts]);
  
  const displayValue = (amount) => isBusd ? '$' + parseFloat(amount * arkPrice).toFixed(2) : parseFloat(amount).toFixed(2);
  
  const handleResponse = (response) => {
    setOpenDialog(false);
    removeWallet(response);
  }
  
  const openConfirmationDialog = (account) => {
    setOpenDialog(true);
    setSelectedRow(account);
  }
  
  const removeWallet = (isConfirmed) => {
    setOpenDialog(false);
    if (!isConfirmed) {
      return false;
    }
    const stored = JSON.parse(localStorage.getItem('arkFiWallets'))
    const updated = stored.filter(w => w !== selectedRow);
    localStorage.setItem('arkFiWallets', JSON.stringify(updated));
    //const updatedWallets = accounts.filter(w => w.account !== account);
    //setWallets(() => [...updatedWallets]);
    window.location.reload(false);
  }
  
  const formatAddress = address => `${address.substring(0,5)}...${address.slice(-5)}`
  
  return (
    <>
    <TableContainer component={Paper} sx={{ marginTop: "2em" }}>
      
      <Controls handleSwitch={() => setIsBusd(!isBusd)} backupData={backupData}/>
      <Table
        sx={{ minWidth: 650, backgroundColor: "AliceBlue" }}
        aria-label="simple table"
      >
        
        
        <TableHeader ></TableHeader>
        <TableBody>
          <TotalsHeader accounts={accounts} totals={totals} displayValue={displayValue} />
          {accounts.map((row) => (
            <TableRow
              key={row.account}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className="remove-row" onClick={() => openConfirmationDialog(row.account)}>
              <RemoveCircleOutlineIcon  sx={{fontSize: "14px"}}/>
              </TableCell>
              <TableCell component="th" scope="row">
                {formatAddress(row.account)}
              </TableCell>
              
              <TableCell align="right">{Timer(row.lastAction)}</TableCell>
              <TableCell align="right">{displayValue(row.principalBalance)}</TableCell>
              <TableCell align="right">{displayValue(row.walletBalance)}</TableCell>
              <TableCell align="right">{row.busdBalance}</TableCell>
              <TableCell align="right">{displayValue(row.availableRewards)}</TableCell>
              <TableCell align="right">{row.maxCwr}</TableCell>
              <TableCell align="right">{row.roi}%</TableCell>
              <TableCell align="right">{displayValue(row.deposits)}</TableCell>
              <TableCell align="right">{row.ndv}</TableCell>
              <TableCell align="right">{displayValue(row.maxPayout)}</TableCell>
              <TableCell align="right">{displayValue(row.nftRewards)}</TableCell>
              <TableCell align="right">{displayValue(row.airdropsReceived)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      {openDialog && <ConfirmationDialog handleResponse={handleResponse}/>}
    </>
  );
}

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Account</TableCell>
        <TableCell>Countdown</TableCell>
        <TableCell align="right">Balance</TableCell>
        <TableCell align="right">Wallet Balance</TableCell>
        <TableCell align="right">BUSD</TableCell>
        <TableCell align="right">Available</TableCell>
        <TableCell align="right">CWR</TableCell>
        <TableCell align="right">Daily ROI</TableCell>
        <TableCell align="right">Total Deposits</TableCell>
        <TableCell align="right">NDV</TableCell>

        <TableCell align="right">Max Payout</TableCell>
        <TableCell align="right">NFT Rewards</TableCell>
        <TableCell align="right">Airdrops Received</TableCell>
      </TableRow>
    </TableHead>
  );
};

const TotalsHeader = ({ accounts, totals, displayValue }) => {
  return (
    <TableRow sx={{ backgroundColor: "lightgrey" }}>
      <TableCell></TableCell>
      <TableCell>{accounts.length}</TableCell>
      <TableCell></TableCell>
      <TableCell align="right">{displayValue(totals.balanceTotal)}</TableCell>
      <TableCell align="right">{displayValue(totals.walletTotal)}</TableCell>
      <TableCell align="right">{totals.busdTotal}</TableCell>
      <TableCell align="right">{displayValue(totals.availTotal)}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell align="right">{displayValue(totals.depositsTotal)}</TableCell>
      <TableCell></TableCell>
      <TableCell align="right">{displayValue(totals.maxPayoutTotal)}</TableCell>
      <TableCell align="right">{displayValue(totals.nftRewardsTotal)}</TableCell>
      <TableCell align="right">{displayValue(totals.airdropsReceivedTotal)}</TableCell>
    </TableRow>
  );
};
