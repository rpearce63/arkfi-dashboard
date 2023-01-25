import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Timer(toDate) {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();

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
        return (hourText + ":" + minutesText + ":" + secondsText);
    }
}

export default function BasicTable({ accounts }) {
  const [totals, setTotals] = useState([]);
  const [timers, setTimers] = useState([]);
  

  useEffect(() => {
    
    const balanceTotal = accounts.reduce(
      (total, account) => total + parseFloat(account.principalBalance),
      0
    );
    const walletTotal = accounts.reduce((total, account) => total + parseFloat(account.walletBalance), 0);
    const busdTotal = accounts.reduce((total, account) => total + parseFloat(account.busdBalance), 0);
    const availTotal = accounts.reduce((total, account) => total + parseFloat(account.availableRewards), 0);
    const depositsTotal = accounts.reduce((total, account) => total + parseFloat(account.deposits), 0);
    const maxPayoutTotal =accounts.reduce((total, account) => total + parseFloat(account.maxPayout), 0);
    const nftRewardsTotal = accounts.reduce((total, account) => total + parseFloat(account.nftRewards), 0);
    setTotals({ ...totals, balanceTotal, walletTotal, busdTotal, availTotal, depositsTotal, maxPayoutTotal, nftRewardsTotal });
  }, [accounts]);

  return (
    <TableContainer component={Paper} sx={{ marginTop: "2em" }}>
      <Table
        sx={{ minWidth: 650, backgroundColor: "AliceBlue" }}
        aria-label="simple table"
      >
        <TableHeader/>
        <TableBody>
          <TotalsHeader accounts={accounts} totals={totals} />
          {accounts.map((row) => (
            <TableRow
              key={row.account}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.account}
              </TableCell>
              <TableCell align="right">{row.principalBalance}</TableCell>
              <TableCell align="right">{row.walletBalance}</TableCell>
              <TableCell align="right">{row.busdBalance}</TableCell>
              <TableCell align="right">{row.availableRewards}</TableCell>
              <TableCell align="right">{row.maxCwr}</TableCell>
              <TableCell align="right">{row.roi}%</TableCell>
              <TableCell align="right">{row.deposits}</TableCell>
              <TableCell align="right">{row.ndv}</TableCell>
              <TableCell align="right">{row.maxPayout}</TableCell>
              <TableCell align="right">{row.nftRewards}</TableCell>
              <TableCell align="right">{Timer(row.lastAction)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Account</TableCell>
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
      </TableRow>
    </TableHead>
  );
};

const TotalsHeader = ({accounts, totals}) => {
  return (
    <TableRow sx={{ backgroundColor: "lightgrey" }}>
      <TableCell>{accounts.length}</TableCell>
      <TableCell align="right">{totals.balanceTotal}</TableCell>
      <TableCell align="right">{totals.walletTotal}</TableCell>
      <TableCell align="right">{totals.busdTotal}</TableCell>
      <TableCell align="right">{totals.availTotal}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell align="right">{totals.depositsTotal}</TableCell>
      <TableCell></TableCell>
      <TableCell align="right">{totals.maxPayoutTotal}</TableCell>
      <TableCell align="right">{totals.nftRewardsTotal}</TableCell>
      
    </TableRow>
  );
};
