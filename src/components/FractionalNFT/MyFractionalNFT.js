import { React, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ethers, BigNumber } from "ethers";

import Storage from "../../CONTRACT-ABI/FractionalNFT/Storage.json";
import StorageAddress from "../../CONTRACT-ABI/FractionalNFT/StorageAddress.json";

export let selectedNft;

function YourFractionedNFTsWallet() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserDepositedNfts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const options = { method: "GET", headers: { Accept: "application/json" } };

    await fetch(
      `https://testnets-api.opensea.io/api/v1/assets?owner=${StorageAddress}&order_direction=desc&limit=20&include_orders=false`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response.assets))
      .catch((err) => console.error(err));

    // console.log(data)
  };

  async function setUserDepositedNfts() {
    getData();
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(StorageAddress, Storage.abi, signer);
      try {
        let userDepositedNftAddress = await contract.getUserDepositedNftAddress(
          signer.getAddress()
        );
        let userDepositedNftIds = await contract.getUserDepositedNftIds(
          signer.getAddress()
        );
        let userNFTs = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < userDepositedNftAddress.length; j++) {
            if (
              BigNumber.from(data[i].asset_contract.address).eq(
                BigNumber.from(userDepositedNftAddress[j])
              ) &&
              BigNumber.from(data[i].token_id).eq(userDepositedNftIds[j])
            ) {
              userNFTs.push(data[i]);
              console.log(data[i].name);
              break;
            }
          }
        }

        setUserData(userNFTs);
        //console.log('response: ' + response);
      } catch (err) {
        console.log("error", err);
      }
    }
  }

  const renderNfts = (nft, index) => {
    return (
      <Button
        key={index}
        onClick={() => (selectedNft = nft)}
        style={{ margin: 20 }}
      >
        <p>
          {nft.name} #{nft.token_id}
        </p>
      </Button>
    );
  };

  return (
    <nav>
      <div>
        <Button onClick={setUserDepositedNfts}>Get Nfts</Button>
      </div>

      {userData.map(renderNfts)}
    </nav>
  );
}

export default YourFractionedNFTsWallet;
