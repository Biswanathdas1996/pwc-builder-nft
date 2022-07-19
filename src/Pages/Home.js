import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Toolbar, ButtonGroup } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import NftCard from "../components/shared/NFT-Card";
import RecentActivity from "../components/shared/RecentActivity";
import TopBanner from "../components/Header/TopBanner";
import { _fetch } from "../CONTRACT-ABI/connect";
import { useNavigate } from "react-router-dom";
import Loader from "../components/shared/Loader";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BlogList from "../components/shared/BlogList";
import CategoryList from "../components/shared/CategoryList";

export default function HomePage() {
  const [tokens, setToken] = useState([]);
  const [loading, setLoading] = useState(false);
  let history = useNavigate();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  async function fetchAllPosts() {
    setLoading(true);
    const getAllToken = await _fetch("getToken");

    await setToken(getAllToken.slice(0, 15));
    setLoading(false);
  }

  return (
    <>
      <TopBanner></TopBanner>
      <Container>
        <Box
          sx={{
            pt: 4,
            pb: 2,
          }}
        >
          <CategoryList />

          {/* <Typography
            component="h1"
            variant="h7"
            align="left"
            color="text.primary"
            fontSize="40px"
          >
            Buy/Sell Digital Art on our Art Gallery
          </Typography> */}
        </Box>
        <Toolbar style={{ padding: 0 }}>
          <Typography
            component="h3"
            variant="h7"
            textAlign="left"
            color="text.primary"
            style={{ fontSize: 17, fontWeight: "bold" }}
          >
            Top Selling
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <ButtonGroup size="small">
            <Button>
              <FilterAltOutlinedIcon />
            </Button>
            <Button
              sx={{
                textTransform: "none",
                color: "black",
                fontWeight: 500,
                pt: "5px",
              }}
            >
              Filter & Sort
            </Button>
          </ButtonGroup>
        </Toolbar>

        <Grid container spacing={4}>
          {tokens && tokens?.length > 0 ? (
            tokens?.map((item) => <NftCard tokenId={item} />)
          ) : loading ? (
            <Grid item xs={12} sm={12} md={12}>
              <Loader count="10" xs={12} sm={6} md={2.4} />
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={12}>
              <h3>No NFT available</h3>
            </Grid>
          )}
        </Grid>

        <center>
          {!loading && tokens?.length > 0 && (
            <Button
              onClick={() => history(`/top-selling`)}
              variant="contained"
              type="button"
              sx={{
                marginRight: "20px",
                textTransform: "none",
              }}
              style={{ margin: 20, width: "8rem" }}
              endIcon={<ChevronRightIcon />}
            >
              View All
            </Button>
          )}
        </center>
        <BlogList />

        <RecentActivity />
      </Container>
      <div style={{ marginTop: 50 }}></div>
    </>
  );
}
