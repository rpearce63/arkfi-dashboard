import * as React from "react";
import {useState, useEffect} from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export default function BasicTable({accounts}) {
  
  const [totalBalance, setTotalBalance] = useState(0);
  
  useEffect(() => {
    const balanceTotal = accounts.reduce((total, account) => total + parseFloat(account.principalBalance), 0);
    setTotalBalance(balanceTotal)
  },[])

  return (
    <TableContainer component={Paper} sx={{ marginTop: "2em" }}>
      <Table sx={{ minWidth: 650, backgroundColor: "AliceBlue" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Wallet Balance</TableCell>
            <TableCell align="right">Available</TableCell>
            <TableCell align="right">CWR</TableCell>
            <TableCell align="right">Daily ROI</TableCell>
            <TableCell align="right">Total Deposits</TableCell>
            <TableCell align="right">NDV</TableCell>

            <TableCell align="right">Max Payout</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{backgroundColor: "WhiteSmoke"}}>
            <TableCell>{accounts.length}</TableCell>
            <TableCell>{totalBalance}</TableCell>
          </TableRow>
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
