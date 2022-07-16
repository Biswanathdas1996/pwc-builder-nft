export const EtherscanBaseAPI = `https://api-rinkeby.etherscan.io/api`;
export const PolyscanscanBaseAPI = `https://api-testnet.polygonscan.com/api`;
export const EtherscanAPIKEY = `WCVDU52748WW4F7EKDEDB89HKH41BIA4N2`;
export const PolyscanscanAPIKEY = `G2FQ3WI7SWZDIEQE8CCCSZHJ1M97NXNYAE`;

export const WalletPrivateKey =
  "33e8389993eea0488d813b34ee8d8d84f74f204c17b95896e9380afc6a514dc7";

export const Network = `rinkeby`;
export const NetworkTest = `rinkeby`;
export const IPFSLink = `https://ipfs.infura.io:5001/api/v0`;
export const InfuraProjectId = `24022fda545f41beb59334bdbaf3ef32`;
export const InfuraNodeURL = `https://${Network}.infura.io/v3/${InfuraProjectId}`;

export const RinkebyStorageAddress =
  "0xE2648EFc2b1705a808057ac381e89A36af49f14b";
export const RinkebyAuctionAddress =
  "0xBDbe53A0197928F0D3a82E27eA3e36fe4194D06C";
export const RinkebyNftAddress = "0x3ed3Cf2eB24d8eC5E85D6Ae02C63A8ddc640D51A";

export const PaymentURI = "https://nft-payment.herokuapp.com/payment";

// --------------------------------------------------------------------------------

export const openSeaURI = (address, tokenId) => {
  const networkId = sessionStorage.getItem("currentyNetwork");
  let network;
  if (networkId === "80001") {
    network = "mumbai";
  } else if (networkId === "4") {
    network = "rinkeby";
  }
  return `https://testnets.opensea.io/assets/${network}/${address}/${tokenId}/?force_update=true`;
};

export const networkURL = () => {
  const networkId = sessionStorage.getItem("currentyNetwork");
  let network;
  if (networkId === "80001") {
    network = "https://mumbai.polygonscan.com";
  } else if (networkId === "4") {
    network = "https://rinkeby.etherscan.io";
  }
  return network;
};

export const getTransctionListAPI = (account) => {
  const networkId = sessionStorage.getItem("currentyNetwork");
  let URI;
  if (networkId === "80001") {
    URI = `${PolyscanscanBaseAPI}?module=account&action=txlist&address=${account}&sort=desc&apikey=${PolyscanscanAPIKEY}`;
  } else if (networkId === "4") {
    URI = `${EtherscanBaseAPI}?module=account&action=txlist&address=${account}&sort=desc&page=1&offset=10&apikey=${EtherscanAPIKEY}`;
  }
  return URI;
};
