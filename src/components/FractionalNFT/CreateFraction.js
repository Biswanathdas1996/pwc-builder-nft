import { React, useState } from "react";

import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import { BigNumber } from "ethers";

import TransctionModal from "../shared/TransctionModal";
import { useNavigate } from "react-router-dom";
import RinkebyStorageAddress from "../../CONTRACT-ABI/FractionalNFT/StorageAddress.json";
import NFTAddress from "../../CONTRACT-ABI/FractionalNFT/NFTAddress.json";
import { Card, Grid } from "@mui/material";

import { _transction_nft } from "../../CONTRACT-ABI/FractionalNFT/ConnectNFT";
import { _transction_storage } from "../../CONTRACT-ABI/FractionalNFT/ConnectStorage";

function CreateFraction() {
  const [fractionTokenName, setFractionTokenName] = useState("");
  const [fractionTokenTicker, setFractionTokenTicker] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const [tokenRoyalty, setTokenRoyalty] = useState("");
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);

  let history = useNavigate();

  const handleFractionTokenNameChange = (event) =>
    setFractionTokenName(event.target.value);
  const handleFractionTokenTickerChange = (event) =>
    setFractionTokenTicker(event.target.value);
  const handleTokenSupplyChange = (event) => setTokenSupply(event.target.value);
  const handleTokenRoyaltyChange = (event) =>
    setTokenRoyalty(event.target.value);

  const selectedNft = sessionStorage.getItem("selectedNft");

  const handleApproveNftContract = async () => {
    setStart(true);
    await _transction_nft("approve", RinkebyStorageAddress, selectedNft);

    setStatus("approved");
    setStart(false);
  };

  async function handleDepositNft() {
    setStart(true);
    await _transction_storage("depositNft", NFTAddress, selectedNft);
    setStatus("deposit");
    setStart(false);
  }

  async function handleFractionNft() {
    setStart(true);
    let supplyString =
      BigNumber.from(tokenSupply).toString() + "000000000000000000";
    const response = await _transction_storage(
      "createFraction",
      NFTAddress,
      BigNumber.from(selectedNft),
      fractionTokenName.toString(),
      fractionTokenTicker.toString(),
      BigNumber.from(supplyString) /*BigNumber.from(tokenSupply)*/,
      BigNumber.from(tokenRoyalty)
    );

    setResponse(response);
    setStatus("done");
  }

  const renderButtons = () => {
    if (status === null) {
      return (
        <Button onClick={() => handleApproveNftContract()} variant="contained">
          Approve Contract
        </Button>
      );
    } else if (status === "approved") {
      return (
        <>
          <p>Contract successfully approved, please deposit your NFT... </p>
          <Button
            onClick={() => handleDepositNft()}
            variant="contained"
            color="success"
          >
            Deposit NFT
          </Button>
        </>
      );
    } else if (status === "deposit") {
      return (
        <>
          <p style={{ color: "green" }}>
            Contract deposit successfully, please initialize fractionalization
            process
          </p>
          <Button
            onClick={() => handleFractionNft()}
            variant="contained"
            color="error"
          >
            Fraction NFT
          </Button>
        </>
      );
    }
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
    history("/my-fractional-nft");
  };

  return (
    <nav>
      {start && <TransctionModal response={response} modalClose={modalClose} />}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div style={{ margin: 20 }}>
            <Card>
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    style={{
                      padding: "20px",
                      background: "white",
                    }}
                  >
                    <h4>Create Fraction of token id #{selectedNft}</h4>
                    <br />
                    <Form>
                      <Form.Group>
                        <Form.Label>Fraction Token Name:</Form.Label>
                        <Form.Control
                          placeholder="Enter Fraction Token Name"
                          onChange={handleFractionTokenNameChange}
                        />
                        <Form.Label style={{ marginTop: 15 }}>
                          Fraction Token Ticker:
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter Token Ticker"
                          onChange={handleFractionTokenTickerChange}
                        />
                        <Form.Label style={{ marginTop: 15 }}>
                          Token Supply:
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter Fraction Token supply"
                          onChange={handleTokenSupplyChange}
                        />
                        <Form.Label style={{ marginTop: 15 }}>
                          Token Royalty:
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter Fraction Token Royalty"
                          onChange={handleTokenRoyaltyChange}
                        />
                      </Form.Group>
                      <div style={{ marginTop: 20 }}>{renderButtons()}</div>
                    </Form>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </div>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
      </Grid>
    </nav>
  );
}

export default CreateFraction;
