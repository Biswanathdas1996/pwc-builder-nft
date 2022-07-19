import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toolbar, ButtonGroup } from "@mui/material";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import NftCard from "./NFT-Card";

const theme = createTheme();

export default function ArtExplore({ title, subTitle, data }) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Box
          sx={{
            pt: 4,
            pb: 2,
          }}
        >
          <Container>
            <Typography
              component="h1"
              variant="h7"
              align="left"
              color="text.primary"
              fontSize="40px"
            >
              {title}
            </Typography>
          </Container>
        </Box>

        <Container>
          <Toolbar style={{ padding: 0 }}>
            <Typography
              component="h3"
              variant="h7"
              textAlign="left"
              color="text.primary"
              // gutterBottom
            >
              {subTitle}
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
        </Container>

        <Grid container spacing={4}>
          {data && data?.length > 0 ? (
            data?.map((item) => <NftCard tokenId={item} />)
          ) : (
            <Grid item xs={12} sm={12} md={12}>
              <h3>No NFT available</h3>
            </Grid>
          )}
        </Grid>
      </>

      <Box sx={{ bgcolor: "background.paper", p: 6 }}></Box>
    </ThemeProvider>
  );
}
