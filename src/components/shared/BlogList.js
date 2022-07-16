import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import Blog1 from "../../assets/images/im-368880.jpg";
import Blog2 from "../../assets/images/img3.jpg";
import Blog3 from "../../assets/images/banners.png";
import Blog4 from "../../assets/images/im-496545.jpg";

export default function RecipeReviewCard() {
  const cardUI = (text, img, user, height) => {
    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height={height || "350"}
          image={img}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  };

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Typography
            component="h3"
            variant="h7"
            textAlign="left"
            color="text.primary"
            style={{ fontSize: 17, fontWeight: "bold" }}
          >
            BLOGS AND POSTS
          </Typography>
        </Grid>

        <Grid item xs={8}>
          {cardUI(
            `This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.`,
            Blog3
          )}
        </Grid>
        <Grid item xs={4}>
          {cardUI(
            `This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests.`,
            Blog1
          )}
        </Grid>
        <Grid item xs={4}>
          {cardUI(
            `This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests.`,
            Blog2
          )}
        </Grid>
        <Grid item xs={8}>
          {cardUI(
            `This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.`,
            Blog4
          )}
        </Grid>
      </Grid>
    </>
  );
}
