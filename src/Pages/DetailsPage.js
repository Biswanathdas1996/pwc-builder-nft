import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Grid, Typography } from "@mui/material";
import RightContent from "../components/DetailsPage/RightContent";
import LeftConrent from "../components/DetailsPage/LeftConrent";
import { _fetch, _account } from "../CONTRACT-ABI/connect";
import { useParams } from "react-router-dom";
import RecentActivity from "../components/shared/RecentActivity";
import Loader from "../components/shared/Loader";
import { buyNft, displayRazorpay } from "../functions/buyNft";
import TransctionModal from "../components/shared/TransctionModal";
import { accessablity } from "../utils/tokenListingState";

import {
  getContractAddress,
  getcurrentNetworkId,
} from "../CONTRACT-ABI/connect";

const theme = createTheme();

export default function DetailsPage({ match }) {
  const [nftData, setNftData] = useState(null);
  const [start, setStart] = useState(false);
  const [owner, setOwner] = useState(null);
  const [account, setAccount] = useState(null);
  const [price, setPrice] = useState(null);
  const [response, setResponse] = useState(null);
  const [address, setAddress] = useState(null);
  const [isDoingPayment, setIsDoingPayment] = useState(false);
  const { tokenId } = useParams();
  const [listingState, setListingState] = useState(null);

  useEffect(() => {
    fetchNftInfo();
    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAddress = async () => {
    const networkIddarta = await getcurrentNetworkId();
    const cureentAccress = getContractAddress(networkIddarta);
    setAddress(cureentAccress);
  };

  async function fetchNftInfo() {
    const getAllTokenUri = await _fetch("tokenURI", tokenId);
    const getOwner = await _fetch("ownerOf", tokenId);
    setOwner(getOwner);
    const account = await _account();
    setAccount(account);
    const price = await _fetch("getNftPrice", tokenId);
    setPrice(price);
    const getTokenListingState = await _fetch("getTokenListingState", tokenId);
    setListingState(getTokenListingState?.tokenState);

    await fetch(getAllTokenUri)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNftData(data);
      });
  }

  const buynow = async (title) => {
    setIsDoingPayment(true);
    const price = await _fetch("getNftPrice", tokenId);
    await displayRazorpay(
      price,
      async function (response) {
        setStart(true);
        const responseData = await buyNft(Number(tokenId));
        setResponse(responseData);
      },
      title
    );
    setIsDoingPayment(false);
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
  };

  if (listingState === accessablity.Privet && owner !== account) {
    return (
      <Container>
        <Grid spacing={4} marginY="50px">
          <Typography
            sx={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}
          >
            Only Owner of the token can access this page
          </Typography>
        </Grid>
      </Container>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        {start && (
          <TransctionModal response={response} modalClose={modalClose} />
        )}
        <CssBaseline />
        <Container>
          <main style={{ marginBottom: 30 }}>
            {nftData ? (
              <Grid
                justifyContent="space-between"
                container
                spacing={4}
                marginY="50px"
              >
                <Grid item xs={12} md={5}>
                  <LeftConrent
                    nftData={nftData}
                    tokenId={tokenId}
                    ContractAddress={address}
                  />
                </Grid>

                <Grid item xs={12} md={7}>
                  <RightContent
                    nftData={nftData}
                    owner={owner}
                    price={price}
                    buynow={buynow}
                    account={account}
                    tokenId={tokenId}
                    fetchNftInfo={fetchNftInfo}
                    isDoingPayment={isDoingPayment}
                    listingState={listingState}
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid
                justifyContent="space-between"
                container
                spacing={4}
                marginY="50px"
              >
                <Loader count="2" xs={12} sm={12} md={6} lg={6} />
              </Grid>
            )}
            <RecentActivity />
          </main>
        </Container>
      </ThemeProvider>
    );
  }
}
