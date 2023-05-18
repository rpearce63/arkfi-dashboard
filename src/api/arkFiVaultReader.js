import { web3bsc } from "./vars";

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
        components: [
          {
            internalType: "address",
            name: "investor",
            type: "address",
          },
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
        ],
        internalType: "struct ArkFiVaultReader.Vault",
        name: "vaultData",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "lastAction",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "roundRobinPosition",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastSell",
            type: "uint256",
          },
        ],
        internalType: "struct ArkFiVaultReader.Vault2",
        name: "addlData",
        type: "tuple",
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
const arkiFiVaultReaderAddress = "0x2A3825a36dd315a67F1fdf10315CAce87ccfD0d8";
const arkFiVaultReader = new web3bsc.eth.Contract(
  arkFiVaultReadersABI,
  arkiFiVaultReaderAddress
);

export const getPlayerStats = async (address) => {
  const playerStats = await arkFiVaultReader.methods
    .getInvestorStats(address)
    .call();
  const { vaultData, addlData, bondData, nftData } = playerStats;
  return { ...vaultData, ...addlData, bondData, nftData };
};
