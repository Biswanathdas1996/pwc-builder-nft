import React from "react";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { useNavigate } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@mui/material/CardMedia";
import HeaderWrapper from "../components/shared/BackgroundUI";
import HeaderUI from "../components/shared/HeaderUI";

import NftFreagments from "../assets/images/imgx3.png";
import SingleNFT from "../assets/images/vila.png";

const Mint = () => {
  let history = useNavigate();
  return (
    <HeaderWrapper className="header-wrapper-create">
      <HeaderUI>
        <center
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="240"
              image={SingleNFT}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Create Single NFT
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  marginX: "15px",
                  marginBottom: "15px",
                }}
                onClick={() => history("/nft-mint")}
                style={{
                  border: "2px solid #1976d2",
                  fontSize: 16,

                  borderRadius: 12,
                }}
              >
                Create Now
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="240"
              image={NftFreagments}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Create Fractional NFT
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  marginX: "15px",
                  marginBottom: "15px",
                }}
                onClick={() => history("/fractional-nft-mint")}
                style={{
                  border: "2px solid #1976d2",
                  fontSize: 16,
                  borderRadius: 12,
                }}
              >
                Create Now
              </Button>
              <small>*Work in progress</small>
            </CardActions>
          </Card>
        </center>
        <div style={{ marginTop: 60 }}></div>
      </HeaderUI>
    </HeaderWrapper>
  );
};
export default Mint;
