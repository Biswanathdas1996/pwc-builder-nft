import {
  getContractAddress,
  getcurrentNetworkId,
} from "../CONTRACT-ABI/connect";

import { EtherscanBaseAPI, EtherscanAPIKEY } from "../config";

export async function frtchAccounttransction() {
  const networkIddarta = await getcurrentNetworkId();
  const cureentAccress = getContractAddress(networkIddarta);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(
    `${EtherscanBaseAPI}?module=account&action=tokennfttx&contractaddress=${cureentAccress}&page=1&offset=10000&sort=asc&apikey=${EtherscanAPIKEY}`,
    requestOptions
  );
}
