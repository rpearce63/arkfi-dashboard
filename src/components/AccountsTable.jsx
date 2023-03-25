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
import { GetArkPrice_Swap, getBnbPrice } from "../api/arkfi";
import { backupData, getArkPrice } from "../api/utils";
import ConfirmationDialog from "./ConfirmationDialog";
import Button from "@mui/material/Button";
import Controls from "./Controls";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import RewardsTimer from "./RewardsTimer";

export default function AccountsTable({ accounts }) {
  const [rows, setRows] = useState([]);
  const [totals, setTotals] = useState([]);
  const [timers, setTimers] = useState([]);
  const [selected, setSelected] = React.useState(false);
  const [isBusd, setIsBusd] = useState(false);
  const [arkPrice, setArkPrice] = useState(0);
  const [bnbPrice, setBnbPrice] = useState(0);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [includeBonds, setIncludeBonds] = useState(false);
  const [includeNfts, setIncludeNfts] = useState(false);

  const getUpdatedArkPrice = async () => {
    const arkPrice = await getArkPrice();
    setArkPrice(arkPrice);
  };
  
  const getCurrentBnbPrice = async () => {
    const _bnbPrice = await getBnbPrice();
    setBnbPrice(_bnbPrice);
  }
  
  useEffect(() => {
    setRows([...accounts]);
    getUpdatedArkPrice();
    getCurrentBnbPrice();
  }, [accounts]);

  useEffect(() => {
    const balanceTotal = rows.reduce(
      (total, account) => total + parseFloat(account.principalBalance),
      0
    );
    const walletTotal = rows.reduce(
      (total, account) => total + parseFloat(account.walletBalance),
      0
    );
    const bnbTotal = rows.reduce(
      (total, account) => total + parseFloat(account.bnbBalance),
      0
    );
    const busdTotal = rows.reduce(
      (total, account) => total + parseFloat(account.busdBalance),
      0
    );
    const availTotal = rows.reduce(
      (total, account) => total + parseFloat(account.availableRewards),
      0
    );
    const depositsTotal = rows.reduce(
      (total, account) => total + parseFloat(account.deposits),
      0
    );
    const withdrawnTotal = rows.reduce(
      (total, account) => total + parseFloat(account.withdrawn),
      0
    );
    const maxPayoutTotal = rows.reduce(
      (total, account) => total + parseFloat(account.maxPayout),
      0
    );
    const nftRewardsTotal = rows.reduce(
      (total, account) => total + parseFloat(account.nftRewards),
      0
    );
    const airdropsReceivedTotal = rows.reduce(
      (total, account) => total + parseFloat(account.airdropsReceived),
      0
    );
    const dailyEarnedTotal = rows.reduce(
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
      bnbTotal,
      availTotal,
      depositsTotal,
      maxPayoutTotal,
      nftRewardsTotal,
      airdropsReceivedTotal,
      dailyEarnedTotal,
      withdrawnTotal
    });

    getUpdatedArkPrice();
  }, [rows]);

  const displayValue = (amount, tax = 0) =>
    isBusd
      ? "$" + parseFloat(amount * (1 - tax) * arkPrice).toFixed(2)
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
    setRows([...rows.filter((row) => row.account !== selectedRow)]);
    //window.location.reload(false);
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
        {rows.length === 0 ? (
            <Box sx={{ position: "absolute", left: "50%", top: "50%" }}>
              <CircularProgress />
            </Box>
          ) : (
        <Table
          sx={{ minWidth: 650, backgroundColor: "AliceBlue" }}
          aria-label="simple table"
        >
          <TableHeader
            includeBonds={includeBonds}
            includeNfts={includeNfts}
            isBusd={isBusd}
          ></TableHeader>
          
          
            <TableBody>
              <TotalsHeader
                accounts={rows}
                totals={totals}
                displayValue={displayValue}
                formatCurrency={formatCurrency}
                includeNfts={includeNfts}
                includeBonds={includeBonds}
                bnbPrice={bnbPrice}
                isBusd={isBusd}
              />
              {rows.map((row) => (
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
                    {isBusd ? "$" + row.expectedBusd : row.walletBalance}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(isBusd ? row.bnbBalance * bnbPrice : row.bnbBalance)}
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
                      parseFloat(row.principalBalance * (row.roi/100)).toFixed(2)
                    )}
                    )
                  </TableCell>
                  <TableCell align="right">
                    {displayValue(row.deposits)}
                  </TableCell>
                  <TableCell align="right">
                    {displayValue(row.withdrawn)}
                  </TableCell>
                  <TableCell align="right">{row.ndv}</TableCell>
                  <TableCell align="right">
                    {displayValue(row.maxPayout)}
                  </TableCell>
                  {includeNfts && (
                    <>
                      <TableCell align="right">
                        {displayValue(row.nftRewards)}
                      </TableCell>
                      <TableCell align="right">{row.nftLevel}</TableCell>
                    </>
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
                  <TableCell>
                    {row.refLevel >= 1 ? (
                      <CheckRoundedIcon sx={{ color: "green" }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: "red" }} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
         
        </Table> )}
      </TableContainer>
      {openDialog && <ConfirmationDialog handleResponse={handleResponse} />}
    </>
  );
}

const TableHeader = ({ includeBonds, includeNfts, isBusd }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Account</TableCell>
        <TableCell align="right">Rewards Timer</TableCell>
        <TableCell align="right">Balance</TableCell>
        <TableCell align="right">
          Wallet Balance{" "}
          {isBusd ? (
            <span>
              <br />
              (After Tax)
            </span>
          ) : (
            ""
          )}
        </TableCell>
        <TableCell align="right">BNB</TableCell>
        <TableCell align="right">BUSD</TableCell>
        <TableCell align="right">Available Rewards</TableCell>
        <TableCell align="right">CWR</TableCell>
        <TableCell align="right">Daily ROI</TableCell>
        <TableCell align="right">Total Deposits</TableCell>
        <TableCell align="right">Total Withdrawn</TableCell>
        <TableCell align="right">NDV</TableCell>

        <TableCell align="right">Max Payout</TableCell>
        {includeNfts && (
          <>
            <TableCell align="right">NFT Rewards</TableCell>
            <TableCell align="right">NFT Held</TableCell>
          </>
        )}
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
  bnbPrice,
  isBusd
}) => {
  return (
    <TableRow sx={{ backgroundColor: "lightgrey" }}>
      <TableCell>Totals</TableCell>
      <TableCell>{accounts.length}</TableCell>
      <TableCell></TableCell>
      <TableCell align="right">{displayValue(totals.balanceTotal)}</TableCell>
      <TableCell align="right">
        {displayValue(totals.walletTotal, 0.13)}
      </TableCell>
      <TableCell align="right">{formatCurrency(isBusd ? totals.bnbTotal * bnbPrice : totals.bnbTotal)}</TableCell>
      <TableCell align="right">{formatCurrency(totals.busdTotal)}</TableCell>
      <TableCell align="right">{displayValue(totals.availTotal)}</TableCell>
      <TableCell></TableCell>
      <TableCell align="right">
        {displayValue(totals.dailyEarnedTotal)}
      </TableCell>
      <TableCell align="right">{displayValue(totals.depositsTotal)}</TableCell>
      <TableCell align="right">{displayValue(totals.withdrawnTotal)}</TableCell>
      <TableCell></TableCell>
      <TableCell align="right">{displayValue(totals.maxPayoutTotal)}</TableCell>
      {includeNfts && (
        <>
          <TableCell align="right">
            {displayValue(totals.nftRewardsTotal)}
          </TableCell>
          <TableCell></TableCell>
        </>
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
      <TableCell></TableCell>
    </TableRow>
  );
};
