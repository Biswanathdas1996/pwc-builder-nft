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
import { _fetch } from "../CONTRACT-ABI/connect";
import Loader from "../components/shared/Loader";
import { useParams } from "react-router-dom";

export default function HomePage() {
  const [tokens, setToken] = useState([]);
  const [loading, setLoading] = useState(false);

  const { category } = useParams();

  useEffect(() => {
    fetchAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  async function fetchAllPosts() {
    await setToken([]);
    setLoading(true);
    const getAllToken = await _fetch("getCollection");
    const filterCollection = getAllToken?.filter(
      (data) =>
        data?.collection?.toLocaleLowerCase() === category?.toLocaleLowerCase()
    );
    await setToken(filterCollection);
    setLoading(false);
  }

  return (
    <Container>
      <Box
        sx={{
          pt: 4,
          pb: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h7"
          align="left"
          color="text.primary"
          fontSize="40px"
        >
          Buy/Sell Digital Art on our {category?.toUpperCase()} Gallery
        </Typography>
      </Box>
      <Toolbar style={{ padding: 0 }}>
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
          tokens?.map((item) => <NftCard tokenId={item?.token} />)
        ) : loading ? (
          <Grid item xs={12} sm={12} md={12}>
            <Loader count="5" xs={12} sm={6} md={2.4} />
          </Grid>
        ) : (
          <Grid item xs={12} sm={12} md={12}>
            <h3>No NFT available</h3>
          </Grid>
        )}
      </Grid>

      <RecentActivity />
      <div style={{ marginTop: 50 }}></div>
    </Container>
  );
}
