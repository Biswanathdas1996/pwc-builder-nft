import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { _fetch, _account } from "../../CONTRACT-ABI/connect";
import { buyNft, displayRazorpay } from "../../functions/buyNft";
import TransctionModal from "./TransctionModal";
import MarkAsFevourite from "./MarkAsFevourite";
import RedirectToOpenSea from "./RedirectToOpenSea";
import { getIcon } from "../../utils/currencyIcon";
import { getSymbol } from "../../utils/currencySymbol";
import { convertWeiToToken } from "../../utils/convertPrice";
import { badgeUI, accessablity } from "../../utils/tokenListingState";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loader from "../shared/Loader";

import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

export default function NFTCard({
  tokenId,
  reload = () => null,
  isUserProfilePage = false,
}) {
  const [nftData, setNftData] = useState(null);
  const [start, setStart] = useState(false);
  const [price, setPrice] = useState(null);
  const [response, setResponse] = useState(null);
  const [owner, setOwner] = useState(null);
  const [account, setAccount] = useState(null);

  const [listingState, setListingState] = useState(null);

  const [isDoingPayment, setIsDoingPayment] = useState(false);
  const [loading, setLoading] = useState(false);

  let history = useNavigate();

  useEffect(() => {
    fetchNftInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchNftInfo() {
    setLoading(true);
    const getAllTokenUri = await _fetch("tokenURI", tokenId);
    const price = await _fetch("getNftPrice", tokenId);
    setPrice(price);
    const getOwner = await _fetch("ownerOf", tokenId);
    setOwner(getOwner);

    const getTokenListingState = await _fetch("getTokenListingState", tokenId);
    setListingState(getTokenListingState?.tokenState);

    const account = await _account();
    setAccount(account);

    await fetch(getAllTokenUri)
      .then((response) => response.json())
      .then((data) => {
        setNftData(data);
      });
    setLoading(false);
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
    history("/profile");
  };

  const selfOwner = () => {
    if (owner === account) {
      return (
        <>
          <Tooltip title={`You own this NFT`}>
            <AccessibilityNewIcon
              style={{ color: "#4caf50", fontSize: 20, margin: 5 }}
            />
          </Tooltip>
        </>
      );
    }
  };

  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}
      {!loading ? (
        (listingState !== accessablity.Privet || isUserProfilePage) && (
          <Grid item xs={12} sm={6} md={isUserProfilePage ? 4 : 2.4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                border: "0.01px solid rgba(0, 0, 0, 0.09)",
              }}
            >
              <Tooltip title={nftData?.name}>
                <div
                  style={{
                    backgroundImage: `url(${nftData?.image})`,
                    height: "150px",
                    borderRadius: 5,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    margin: "15px 15px 0px 15px",
                  }}
                >
                  <Grid container>
                    <Grid xs={2}>
                      <MarkAsFevourite tokenId={tokenId} reload={reload} />
                    </Grid>
                    <Grid xs={10} sx={{ textAlign: "right" }}>
                      <RedirectToOpenSea tokenId={tokenId} />
                    </Grid>
                  </Grid>
                </div>
              </Tooltip>

              <CardContent style={{ paddingBottom: 0 }}>
                {badgeUI(listingState)}
                {selfOwner()}
                <Typography
                  style={{ fontSize: 14, cursor: "pointer" }}
                  variant="body2"
                  paragraph
                  item
                  fontWeight="600"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "11rem",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    history(`/details/${tokenId}`);
                    return;
                  }}
                >
                  {nftData?.name} #{tokenId}
                </Typography>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Tooltip title="Ethereum">
                    <img
                      alt="nft"
                      width="15px"
                      height="15px"
                      src={getIcon()}
                      style={{ marginRight: 5 }}
                    ></img>
                  </Tooltip>
                  <p>
                    <span className="text-secondary" style={{ color: "grey" }}>
                      Price{" "}
                    </span>
                    <strong style={{ fontSize: 12, fontWeight: "bold" }}>
                      {convertWeiToToken(price)} {getSymbol()}
                    </strong>
                  </p>
                </div>
              </CardContent>

              {listingState === accessablity.Visible ||
                (owner !== account && (
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      marginX: "15px",
                      marginBottom: "15px",
                    }}
                    onClick={() => buynow(`NFT #${tokenId}`)}
                    style={{
                      border: "2px solid #1976d2",
                      fontSize: 10,
                      fontWeight: "bold",
                      padding: 8,
                    }}
                  >
                    {isDoingPayment ? (
                      <>
                        <CircularProgress
                          size={20}
                          style={{ marginRight: 10 }}
                        />{" "}
                        Please wait...
                      </>
                    ) : (
                      "Buy Now"
                    )}
                  </Button>
                ))}
            </Card>
          </Grid>
        )
      ) : (
        <Grid item xs={12} sm={6} md={2.4}>
          <Loader count="1" xs={12} sm={12} md={12} />
        </Grid>
      )}
    </>
  );
}
