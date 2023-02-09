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
import Switch from "@mui/material/Switch";
import { GetArkPrice_Swap } from "../api/arkfi";
import { backupData, getArkPrice } from "../api/utils";
import ConfirmationDialog from "./ConfirmationDialog";
import Button from "@mui/material/Button";
import Controls from "./Controls";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import RewardsTimer from "./RewardsTimer";

export default function AccountsTable({ accounts }) {
  const [totals, setTotals] = useState([]);
  const [timers, setTimers] = useState([]);
  const [selected, setSelected] = React.useState(false);
  const [isBusd, setIsBusd] = useState(false);
  const [arkPrice, setArkPrice] = useState(0);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [includeBonds, setIncludeBonds] = useState(false);
  const [includeNfts, setIncludeNfts] = useState(false);

  const getUpdatedArkPrice = async () => {
    const arkPrice = await getArkPrice();
    setArkPrice(arkPrice);
  };
  useEffect(() => {
    getUpdatedArkPrice();
  }, []);

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
    const dailyEarnedTotal = accounts.reduce(
      (total, account) =>
        total +
        parseFloat(account.principalBalance) * (parseFloat(account.roi) / 100),
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
      airdropsReceivedTotal,
      dailyEarnedTotal,
    });

    getUpdatedArkPrice();
  }, [accounts]);

  const displayValue = (amount, tax = 0) =>
    isBusd
      ? "$" + parseFloat((amount * (1 - tax))  * arkPrice ).toFixed(2)
      : parseFloat(amount).toFixed(2);

  const handleResponse = (response) => {
    setOpenDialog(false);
    removeWallet(response);
  };

  const openConfirmationDialog = (account) => {
    setOpenDialog(true);
    setSelectedRow(account);
  };

  const removeWallet = (isConfirmed) => {
    setOpenDialog(false);
    if (!isConfirmed) {
      return false;
    }
    const stored = JSON.parse(localStorage.getItem("arkFiWallets"));
    const updated = stored.filter((w) => w !== selectedRow);
    localStorage.setItem("arkFiWallets", JSON.stringify(updated));

    window.location.reload(false);
  };

  const formatAddress = (address) =>
    `${address.substring(0, 5)}...${address.slice(-5)}`;

  const formatCurrency = (amount) => {
    const _val = parseFloat(amount).toFixed(2);
    return isBusd ? "$" + _val : _val;
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "2em" }}>
        <Controls
          handleSwitch={() => setIsBusd(!isBusd)}
          backupData={backupData}
          toggleNfts={() => setIncludeNfts(!includeNfts)}
          toggleBonds={() => setIncludeBonds(!includeBonds)}
        />
        <Table
          sx={{ minWidth: 650, backgroundColor: "AliceBlue" }}
          aria-label="simple table"
        >
          <TableHeader
            includeBonds={includeBonds}
            includeNfts={includeNfts}
          ></TableHeader>
          <TableBody>
            <TotalsHeader
              accounts={accounts}
              totals={totals}
              displayValue={displayValue}
              formatCurrency={formatCurrency}
              includeNfts={includeNfts}
              includeBonds={includeBonds}
            />
            {accounts.map((row) => (
              <TableRow
                key={row.account}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <DeleteOutlineOutlinedIcon
                    className="remove-row"
                    onClick={() => openConfirmationDialog(row.account)}
                    sx={{ fontSize: "14px" }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatAddress(row.account)}
                </TableCell>

                <TableCell align="right">
                  <RewardsTimer toDate={row.lastAction} />
                </TableCell>
                <TableCell align="right">
                  {displayValue(row.principalBalance)}
                </TableCell>
                <TableCell align="right">
                  {displayValue(row.walletBalance, .13)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(row.busdBalance)}
                </TableCell>
                <TableCell align="right">
                  {displayValue(row.availableRewards)}
                </TableCell>
                <TableCell align="right">{row.maxCwr}</TableCell>
                <TableCell align="right">
                  {row.roi}% (
                  {displayValue(
                    parseFloat(row.principalBalance * 0.02).toFixed(2)
                  )}
                  )
                </TableCell>
                <TableCell align="right">
                  {displayValue(row.deposits)}
                </TableCell>
                <TableCell align="right">{row.ndv}</TableCell>
                <TableCell align="right">
                  {displayValue(row.maxPayout)}
                </TableCell>
                {includeNfts && (
                  <TableCell align="right">
                    {displayValue(row.nftRewards)}
                  </TableCell>
                )}
                <TableCell align="right">
                  {displayValue(row.airdropsReceived)}
                </TableCell>

                {includeBonds && (
                  <>
                    <TableCell align="right">{row.bondShares}</TableCell>
                    <TableCell align="right">${row.bondValue}</TableCell>
                  </>
                  
                )}
                <TableCell>{row.refLevel >= 1 ? <CheckRoundedIcon sx={{color: "green"}}/> : <CloseRoundedIcon sx={{color: "red"}}/>}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openDialog && <ConfirmationDialog handleResponse={handleResponse} />}
    </>
  );
}

const TableHeader = ({ includeBonds, includeNfts }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Account</TableCell>
        <TableCell align="right">Rewards Timer</TableCell>
        <TableCell align="right">Balance</TableCell>
        <TableCell align="right">Wallet Balance</TableCell>
        <TableCell align="right">BUSD</TableCell>
        <TableCell align="right">Available Rewards</TableCell>
        <TableCell align="right">CWR</TableCell>
        <TableCell align="right">Daily ROI</TableCell>
        <TableCell align="right">Total Deposits</TableCell>
        <TableCell align="right">NDV</TableCell>

        <TableCell align="right">Max Payout</TableCell>
        {includeNfts && <TableCell align="right">NFT Rewards</TableCell>}
        <TableCell align="right">Airdrops Received</TableCell>
        {includeBonds && (
          <>
            <TableCell align="right">Bond Shares</TableCell>
            <TableCell align="right">Bond Value</TableCell>
          </>
        )}
        <TableCell>Spark Elig</TableCell>
      </TableRow>
    </TableHead>
  );
};

const TotalsHeader = ({
  accounts,
  totals,
  displayValue,
  formatCurrency,
  includeNfts,
  includeBonds,
}) => {
  return (
    <TableRow sx={{ backgroundColor: "lightgrey" }}>
      <TableCell>Totals</TableCell>
      <TableCell>{accounts.length}</TableCell>
      <TableCell></TableCell>
      <TableCell align="right">{displayValue(totals.balanceTotal)}</TableCell>
      <TableCell align="right">{displayValue(totals.walletTotal)}</TableCell>
      <TableCell align="right">{formatCurrency(totals.busdTotal)}</TableCell>
      <TableCell align="right">{displayValue(totals.availTotal)}</TableCell>
      <TableCell></TableCell>
      <TableCell align="right">
        {displayValue(totals.dailyEarnedTotal)}
      </TableCell>
      <TableCell align="right">{displayValue(totals.depositsTotal)}</TableCell>
      <TableCell></TableCell>
      <TableCell align="right">{displayValue(totals.maxPayoutTotal)}</TableCell>
      {includeNfts && (
        <TableCell align="right">
          {displayValue(totals.nftRewardsTotal)}
        </TableCell>
      )}
      <TableCell align="right">
        {displayValue(totals.airdropsReceivedTotal)}
      </TableCell>
      {includeBonds && (
        <>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </>
      )}
    </TableRow>
  );
};
