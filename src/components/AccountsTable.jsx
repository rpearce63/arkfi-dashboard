import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ accounts }) {
  const [totals, setTotals] = useState([]);

  useEffect(() => {
    const balanceTotal = accounts.reduce(
      (total, account) => total + parseFloat(account.principalBalance),
      0
    );
    const walletTotal = accounts.reduce((total, account) => total + parseFloat(account.walletBalance), 0);
    const busdTotal = accounts.reduce((total, account) => total + parseFloat(account.busdBalance), 0);
    const availTotal = accounts.reduce((total, account) => total + parseFloat(account.availableRewards), 0);
    const depositsTotal = accounts.reduce((total, account) => total + parseFloat(account.deposits), 0);
    
    
    setTotals({ ...totals, balanceTotal, walletTotal, busdTotal, availTotal, depositsTotal });
  }, [accounts]);

  return (
    <TableContainer component={Paper} sx={{ marginTop: "2em" }}>
      <Table
        sx={{ minWidth: 650, backgroundColor: "AliceBlue" }}
        aria-label="simple table"
      >
        <TableHeader></TableHeader>
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
      </TableRow>
    </TableHead>
  );
};

const TotalsHeader = ({accounts, totals}) => {
  return (
    <TableRow sx={{ backgroundColor: "WhiteSmoke" }}>
      <TableCell>{accounts.length}</TableCell>
      <TableCell align="right">{totals.balanceTotal}</TableCell>
      <TableCell align="right">{totals.walletTotal}</TableCell>
      <TableCell align="right">{totals.busdTotal}</TableCell>
      <TableCell align="right">{totals.availTotal}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell align="right">{totals.depositsTotal}</TableCell>
    </TableRow>
  );
};
