import {
  Typography,
  Box,
  Stack,
  Button,
  Grid,
  Container,
  Tab,
  Link,
  Tooltip,
} from "@mui/material";
import React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import PrivetContent from "./PrivetContent";
import Attributes from "./Attributes";
import AccessablitySettings from "./AccessablitySettings";
import TransactionHistory from "./TransactionHistory";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import UpdatePrice from "./UpdatePrice";
import TransferNft from "./TransferNFT";

import { getIcon } from "../../utils/currencyIcon";
import { getSymbol } from "../../utils/currencySymbol";
import CircularProgress from "@material-ui/core/CircularProgress";
import { accessablity } from "../../utils/tokenListingState";

const countData = ["05", "08", "35", "12"];

const RightContent = ({
  nftData,
  owner,
  price,
  buynow,
  account,
  tokenId,
  fetchNftInfo,
  isDoingPayment,
  listingState,
}) => {
  const [value, setValue] = React.useState("2");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { name, attributes } = nftData;
  return (
    <Container>
      <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>{name}</Typography>
      <Stack direction="row" spacing={12} marginTop="20px">
        <Stack direction="row">
          <ManageAccountsIcon alt="Creator" sx={{ width: 30, height: 30 }} />
          <div style={{ marginLeft: 10 }}>
            <Typography
              sx={{ fontSize: 10, fontWeight: "bold", color: "#858585" }}
            >
              Author
            </Typography>
            <Typography sx={{ fontSize: 11, fontWeight: "bold" }}>
              {nftData?.author}
            </Typography>
          </div>
        </Stack>

        <Stack direction="row">
          <AccountCircleIcon alt="Owner" sx={{ width: 30, height: 30 }} />
          <div style={{ marginLeft: 10 }}>
            <Typography
              sx={{ fontSize: 10, fontWeight: "bold", color: "#858585" }}
            >
              Owner
            </Typography>
            <Tooltip title="Contrct Address">
              <Link
                href={`https://rinkeby.etherscan.io/address/${owner}`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <Typography
                  variant="body2"
                  paragraph
                  item
                  fontWeight="600"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "11rem",
                  }}
                  style={{ fontSize: 10 }}
                >
                  {owner}
                </Typography>
              </Link>
            </Tooltip>
          </div>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginTop="30px"
      >
        <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
          Price
        </Typography>
        <Typography
          sx={{ fontWeight: "600", fontSize: "14px", color: "#ABB2B9" }}
        >
          Ends in
        </Typography>
      </Stack>
      <Grid container marginTop="10px">
        <Grid xs={6}>
          <Stack direction="row" spacing={1}>
            <img
              width="15px"
              height="15px"
              src={getIcon()}
              style={{ marginTop: "4px" }}
              alt="nft"
            />
            <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
              {price / 1000000000000000000} {getSymbol()}
            </Typography>
          </Stack>
        </Grid>

        <Grid xs={6} sx={{ textAlign: "right" }}>
          {countData.map((card) => (
            <Box
              key={card}
              component="span"
              sx={{
                backgroundColor: "#ABB2B9",
                padding: "5px",
                borderRadius: "5px",
                marginLeft: "5px",
                color: "#FFFFFF",
                alignContent: "center",
                fontWeight: "bold",
              }}
            >
              {card}
            </Box>
          ))}
        </Grid>
      </Grid>
      {owner !== account ? (
        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          {listingState === accessablity.Listable && (
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                width: "220px",
                height: "40px",
                fontSize: "12px",
                textAlign: "center",
                margin: 1,
              }}
              onClick={() => buynow(`NFT #${tokenId}`)}
            >
              {isDoingPayment ? (
                <>
                  <CircularProgress
                    size={20}
                    style={{ marginRight: 10 }}
                    color="white"
                  />{" "}
                  Please wait...
                </>
              ) : (
                <>
                  Buy for {price / 1000000000000000000} {getSymbol()}
                </>
              )}
            </Button>
          )}
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              width: "220px",
              height: "40px",
              fontSize: "12px",
              textAlign: "center",
              margin: 1,
            }}
            disabled
          >
            Make an Offer
          </Button>
        </div>
      ) : (
        <Grid container marginTop="10px">
          <Grid xs={6}>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <UpdatePrice
                price={price}
                tokenId={tokenId}
                fetchNftInfo={fetchNftInfo}
              />
            </div>
          </Grid>
          <Grid xs={6}>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <TransferNft
                price={price}
                tokenId={tokenId}
                fetchNftInfo={fetchNftInfo}
              />
            </div>
          </Grid>
        </Grid>
      )}

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Attributes"
                value="2"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "#000000",
                }}
              />
              <Tab
                label="Transaction history"
                value="1"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "#000000",
                }}
              />

              <Tab
                label="Private Content"
                value="3"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "#000000",
                }}
                disabled={owner !== account}
              />
              <Tab
                label="Accessablity"
                value="4"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "#000000",
                }}
                disabled={owner !== account}
              />
            </TabList>
          </Box>
          <Attributes attributes={attributes} />
          <TransactionHistory tokenId={tokenId} />
          <PrivetContent tokenId={tokenId} />
          <AccessablitySettings tokenId={tokenId} />
        </TabContext>
      </Box>
    </Container>
  );
};

export default RightContent;
