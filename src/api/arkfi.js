import axios from "axios";
import Web3 from "web3";

import {
  web3bsc as web3,
  contractBscToken,
  contractBscVault,
  contractBscSwap,
  contractBscBUSD,
  contractBscLegacy,
  contractBscBond,
  pcsRouter
} from "./vars";

//const web3 = web3bsc;

let account = "";

var rewardsTimer = null;
var haltTimer = false;
var initCWR = false;
var initCWRDefault = false;
var autoLoaded = false;
var profileLoaded = false;
var selectRatios = {
  compound: 0,
  withdraw: 0,
  airdrop: 0,
};

async function GetYourReferrer_Vault() {
  try {
    var _val = await contractBscVault.methods.referrerOf(account).call();
    return _val;
  } catch (error) {
    console.log(error);
    return "";
  }
}

// async function GetAutoPaidUntil_Vault() {
//     try {
//         var _val = await contractBscAutoAllo.methods.paidUntil(account).call();
//         return new Date(Number(_val) * 1000);
//     }
//     catch (error) {
//         console.log(error);
//         return new Date();
//     }
// }

async function GetAvailableRewards_Vault() {
  try {
    var _val = await contractBscVault.methods
      .getAvailableReward(account)
      .call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch (error) {
    console.log(error);
    return 0;
  }
}

async function GetExpectedCWR_Vault() {
  try {
    var _lastAction = await LastAction_Vault();
    var _now = new Date();
    var difference = _now.getTime() - _lastAction.getTime();
    var timeSinceLastAction = Math.floor(difference / 1000);
    timeSinceLastAction =
      timeSinceLastAction > 86400 ? 86400 : timeSinceLastAction;
    var _val = await contractBscVault.methods
      .getRollingAverageCwr(
        account,
        timeSinceLastAction.toString(),
        selectRatios.withdraw,
        selectRatios.compound,
        selectRatios.airdrop
      )
      .call();
    return (Number(_val) / 1000).toFixed(3);
  } catch (error) {
    console.log(error);
    return 0;
  }
}

async function GetROI_Vault() {
  try {
    var _val = await contractBscVault.methods.roi(account).call();
    return Number(_val) / 10;
  } catch {
    return 0;
  }
}

async function GetReferrerOf_Vault() {
  try {
    var _val = await contractBscVault.methods.referrerOf(account).call();
    return _val;
  } catch {
    return 0;
  }
}

async function GetPrincipal_Vault() {
  try {
    var _val = await contractBscVault.methods.principalBalance(account).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetDeposits_Vault() {
  try {
    var _val = await contractBscVault.methods.deposits(account).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetDepositsForAddress_Vault(acc) {
  try {
    var _val = await contractBscVault.methods.deposits(acc).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetNewDeposits_Vault() {
  try {
    var _val = await contractBscVault.methods.newDeposits(account).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetOut_Vault() {
  try {
    var _val = await contractBscVault.methods.out(account).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetWithdrawn_Vault() {
  try {
    var _val = await contractBscVault.methods.withdrawn(account).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetAirdropped_Vault() {
  try {
    var _val = await contractBscVault.methods.airdropped(account).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetAirdroppedForAcc_Vault(acc) {
  try {
    var _val = await contractBscVault.methods.airdropped(acc).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetAirdropBalance_Vault() {
  try {
    var _val = await contractBscVault.methods.airdropBalance(account).call();
    _val = web3.utils.fromWei(_val);
    const airdropBalance = Math.floor(Number(_val) * 1000) / 1000;
    _val = Math.floor(Number(_val) * 100) / 100;
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetAirdropBalanceForAcc_Vault(acc) {
  try {
    var _val = await contractBscVault.methods.airdropBalance(acc).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetCompounds_Vault() {
  try {
    var _val = await contractBscVault.methods.compounds(account).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetAirdropsReceived_Vault() {
  try {
    var _val = await contractBscVault.methods.airdropsReceived(account).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetAirdropsReceivedForAcc_Vault(acc) {
  try {
    var _val = await contractBscVault.methods.airdropsReceived(acc).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function LastAction_Vault() {
  try {
    var _val = await contractBscVault.methods.lastAction(account).call();
    _val = new Date(Number(_val) * 1000);
    return _val.getTime();
  } catch {
    return new Date().getTime();
  }
}

async function GetTaxes_Vault() {
  try {
    var _val = await contractBscVault.methods.liqTax().call();
    var _val2 = await contractBscVault.methods.vaultTax().call();

    var _val3 = Number(_val) + Number(_val2);

    return _val3;
  } catch {
    return 10;
  }
}

async function GetMaxPayout_Vault() {
  try {
    var _val = await contractBscVault.methods.maxPayoutAmount(account).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetTax_Vault() {
  try {
    var _val = await contractBscVault.methods.tax(account).call();
    return Number(_val).toFixed(0);
  } catch {
    return 0;
  }
}

async function GetCWR_Vault() {
  try {
    var _val = await contractBscVault.methods.cwr(account).call();
    return (Number(_val) / 1000).toFixed(3);
    //return (Math.floor(Number(_val) / 10) / 100).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetReferalRewards_Vault() {
  try {
    var _val = await contractBscVault.methods.directRewards(account).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetRoundRobinRewards_Vault() {
  try {
    var _val = await contractBscVault.methods.roundRobinRewards(account).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetTotalRewards_Vault() {
  try {
    var _val = await contractBscVault.methods.roundRobinRewards(account).call();
    var _val2 = await contractBscVault.methods.directRewards(account).call();
    _val = web3.utils.fromWei(_val);
    _val2 = web3.utils.fromWei(_val2);
    _val = Number(_val) + Number(_val2);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetBondValue_Vault() {
  try {
    var _val = await contractBscVault.methods.getBondValue(account).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function CalculateUSDValueOfBond_Vault(amount) {
  try {
    var _amount = web3.utils.toWei(amount);
    var _val = await contractBscVault.methods
      .calculateUsdValueOfBond(_amount)
      .call();
    _val = web3.utils.fromWei(_val);

    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetTotalAccounts_Vault() {
  try {
    var _val = await contractBscVault.methods.totalAccounts().call();
    return _val;
  } catch {
    return 0;
  }
}

async function GetLevelForInvestor_Vault() {
  try {
    var _val = await contractBscVault.methods
      .getLevelForInvestor(account)
      .call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(0);
  } catch {
    return 0;
  }
}

async function GetNDVAmountForAcc_Vault(acc) {
  try {
    var _val = await contractBscVault.methods.checkNdv(acc).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetNDVAmount_Vault() {
  try {
    var _val = await contractBscVault.methods.checkNdv(account).call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetARKBalance_Token(dec = 2) {
  try {
    var _val = await contractBscToken.methods.balanceOf(account).call();
    _val = web3.utils.fromWei(_val);
    const arkBalance2 = Math.floor(Number(_val));
    const arkBalance = Math.floor(Number(_val) * 100) / 100;
    return Number(_val).toFixed(dec);
  } catch {
    return 0;
  }
}

export async function GetArkPrice_Swap() {
  try {
    var _val = await contractBscSwap.methods.getCurrentPriceInUSD().call();
    _val = web3.utils.fromWei(_val);
    //const arkPrice = Number(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

const GetBusdBalance = async () => {
  try {
    var _val = await contractBscBUSD.methods.balanceOf(account).call();
    _val = web3.utils.fromWei(_val);
    // const busdBalance = Number(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
};

async function GetClaimableRewards_Legacy() {
  try {
    var _val = await contractBscLegacy.methods
      .getClaimableRewards(account)
      .call();
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetShares_Bond() {
  try {
    var _val = await contractBscBond.methods.shares(account).call();
    _val = web3.utils.fromWei(_val);
    const bondBalance = Math.floor(Number(_val) * 1000) / 1000;
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

async function GetNFTOfOwner_Legacy() {
  try {
    var _val = await contractBscLegacy.methods
      .tokenOfOwnerByIndex(account, 0)
      .call();
    return _val;
  } catch {
    return "";
  }
}

async function GetLevelNFT_Legacy(nftId) {
  try {
    var _val = await contractBscLegacy.methods.levelOfNft(nftId).call();
    return Number(_val);
  } catch {
    return 0;
  }
}

async function GetRefLevelForUser_Syndicate() {
  var bondValue = Number(await GetBondValue_Vault());
  var nftId = await GetNFTOfOwner_Legacy();
  var nftValue = await GetLevelNFT_Legacy(nftId);
  switch (nftValue) {
    default:
      nftValue = 0;
      break;
    case 1:
      nftValue = 1000;
      break;
    case 2:
      nftValue = 4000;
      break;
    case 3:
      nftValue = 10000;
      break;
  }

  bondValue += nftValue;

  var values = [
    250, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 7000, 8000,
    9000, 10000,
  ];
  var level = 0;

  for (let _val in values) {
    if (bondValue >= values[_val]) {
      level++;
    } else {
      break;
    }
  }

  return level;
}

async function HasAccount_Vault() {
  try {
    var _val = await contractBscVault.methods.hasAccount(account).call();
    return _val;
  } catch {
    return false;
  }
}

async function ExpectedBUSDFromARK_Swap(amount) {
  try {
    var hasAcc = await HasAccount_Vault();
    var _amount = web3.utils.toWei(amount);
    var _val;

    if (hasAcc) {
      _val = await contractBscSwap.methods.expectedBUSDFromARK(_amount).call();
      _val = web3.utils.fromWei(_val);
    } else {
      _val = await contractBscSwap.methods
        .expectedBUSDFromARKWithDumpTax(_amount)
        .call();
      _val = web3.utils.fromWei(_val);
    }

    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
}

const getBnbBalance = async () => {
  try {
    var _val = await web3.eth.getBalance(account);
    _val = web3.utils.fromWei(_val);
    return Number(_val).toFixed(2);
  } catch {
    return 0;
  }
};

export const getBnbPrice = async () => {
  var bnbInfo = await pcsRouter.methods.getAmountsOut(web3.utils.toWei("1"), ["0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", "0xe9e7cea3dedca5984780bafc599bd69add087d56"]).call();
  var bnbPrice = Number(web3.utils.fromWei(bnbInfo[1]));

  return bnbPrice;
};


const getDownline = async () => {
  const response = await axios.post("https://api.arkfi.io/downline", {
    investor: account,
  });
  const refTree = response.data.data;
  const directs = refTree ? Object.keys(refTree).length : 0;
  return directs;
};

const nftLevels = ["None", "Silver", "Gold", "Platinum"];

export const initData = async (accounts) => {
  console.log("getting data");
  const response = [];
  for (const wallet of accounts) {
    account = wallet;

    const availableRewards = await GetAvailableRewards_Vault();
    const principalBalance = await GetPrincipal_Vault();
    const maxCwr = await GetCWR_Vault();
    const ndv = await GetNDVAmount_Vault();
    const deposits = await GetDeposits_Vault();
    const roi = await GetROI_Vault();
    const walletBalance = await GetARKBalance_Token();
    const maxPayout = Math.min(principalBalance * 3, 80000);
    const busdBalance = await GetBusdBalance();
    const nftRewards = await GetClaimableRewards_Legacy();
    const lastAction = await LastAction_Vault();
    const level = await GetLevelForInvestor_Vault();
    const newDeposits = await GetNewDeposits_Vault();
    const airdropsReceived = await GetAirdropsReceived_Vault();
    const bondValue = await GetBondValue_Vault();
    const bondShares = await GetShares_Bond();
    const refLevel = await GetRefLevelForUser_Syndicate();
    const nftId = await GetNFTOfOwner_Legacy();
    const nftLevel = await GetLevelNFT_Legacy(nftId);
    const expectedBusd = await ExpectedBUSDFromARK_Swap(walletBalance);
    //const directs = await getDownline()
    const bnbBalance = await getBnbBalance();
    const withdrawn = await GetWithdrawn_Vault();
    

    response.push({
      account: wallet,
      availableRewards,
      principalBalance,
      maxCwr,
      ndv,
      deposits,
      roi,
      walletBalance,
      maxPayout,
      busdBalance,
      nftRewards,
      lastAction,
      level,
      newDeposits,
      airdropsReceived,
      bondValue,
      bondShares,
      refLevel,
      nftLevel: nftLevels[nftLevel],
      expectedBusd,
      //directs
      bnbBalance,
      withdrawn
      
    });
  }
  return response;
};
