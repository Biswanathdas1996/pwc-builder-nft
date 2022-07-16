import { React, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { _account } from "../../CONTRACT-ABI/connect";
import { useNavigate } from "react-router-dom";
import { Card, Grid } from "@mui/material";

export let selectedNft;

function FractionaliseWallet() {
  let history = useNavigate();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const options = { method: "GET", headers: { Accept: "application/json" } };
    const account = await _account();
    fetch(
      `https://testnets-api.opensea.io/api/v1/assets?owner=${account}&order_direction=desc&limit=1&include_orders=false`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.assets[0]) {
          sessionStorage.setItem("selectedNft", response.assets[0].token_id);
          history("/create-fractional-nft-mint");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{ height: 400 }}
      >
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div style={{ marginTop: 30 }}>
            <Card style={{ padding: 20, marginTop: 40 }}>
              <center>
                <CircularProgress />
                <p style={{ marginTop: 20 }}>
                  Please wait... fetching your NFT data...
                </p>
              </center>
            </Card>
          </div>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
      </Grid>
    </nav>
  );
}

export default FractionaliseWallet;
