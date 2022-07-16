import { getTransctionListAPI } from "../config";
export function fetchWallatTransction(account) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(getTransctionListAPI(account), requestOptions);
}
