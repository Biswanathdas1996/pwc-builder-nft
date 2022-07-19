import { create } from "ipfs-http-client";
const ipfsLink = `https://ipfs.infura.io:5001/api/v0`;
const client = create(ipfsLink);
export const uploadFileToIpfs = async (file) => {
  const results = await client.add(file);
  return results;
};
export const getIpfsUrI = (fingerprint) => {
  return `https://ipfs.infura.io/ipfs/${fingerprint}`;
};
