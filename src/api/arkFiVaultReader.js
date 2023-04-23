import Web3 from "web3";
import {web3bsc} from "./vars";

const web3 = new Web3(Web3.givenProvider);

const arkFiVaultReadersABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "investor",
        type: "address",
      },
    ],
    name: "getBondData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "bondValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bondBalance",
            type: "uint256",
          },
        ],
        internalType: "struct ArkFiVaultReader.Bond",
        name: "bondData",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "investor",
        type: "address",
      },
    ],
    name: "getInvestorStats",
    outputs: [
      {
        internalType: "uint256",
        name: "principalBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "availableRewards",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deposits",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "cwr",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "ndv",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "roi",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastAction",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "withdrawn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "walletBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newDeposits",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "airdropsReceived",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "bondValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bondBalance",
            type: "uint256",
          },
        ],
        internalType: "struct ArkFiVaultReader.Bond",
        name: "bondData",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "nftRewards",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nftLevel",
            type: "uint256",
          },
        ],
        internalType: "struct ArkFiVaultReader.Nfts",
        name: "nftData",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "investor",
        type: "address",
      },
    ],
    name: "getNftData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "nftRewards",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nftLevel",
            type: "uint256",
          },
        ],
        internalType: "struct ArkFiVaultReader.Nfts",
        name: "nftData",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const arkiFiVaultReaderAddress = "0xD9A0D009f86BcDDe0B0A6709be32F7bBD3aB73e8";
const arkFiVaultReader = new web3bsc.eth.Contract(
  arkFiVaultReadersABI,
  arkiFiVaultReaderAddress
);

export const getPlayerStats = async (address) => {
  const playerStats = await arkFiVaultReader.methods
    .getInvestorStats(address)
    .call();
  return playerStats;
};