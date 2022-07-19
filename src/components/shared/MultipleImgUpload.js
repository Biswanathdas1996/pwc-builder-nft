import React from "react";
import ImageUploading from "react-images-uploading";
import { Card, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

function MultipleImgUpload({ onchange, images }) {
  const maxNumber = 69; //maximum image upload

  return (
    <>
      <ImageUploading
        multiple //multiple image upload
        value={images}
        onChange={onchange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <Button
              variant="outlined"
              size="medium"
              type="button"
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Upload Image
            </Button>
            &nbsp;
            <Button
              variant="outlined"
              size="medium"
              type="button"
              onClick={onImageRemoveAll}
            >
              Remove all images
            </Button>
            <br />
            <small className="text-success">
              ( Can upload multiple images )
            </small>
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{ marginTop: 20 }}
            >
              {imageList.map((image, index) => (
                <Grid item lg={4} md={4} sm={12} xs={12} key={index}>
                  <Card style={{ margin: 5 }}>
                    <CardActionArea>
                      <CardMedia
                        title="Contemplative Reptile"
                        image={image["data_url"]}
                        style={{ height: 200 }}
                      />
                      <CardContent></CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => onImageUpdate(index)}
                      >
                        Update
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => onImageRemove(index)}
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </ImageUploading>
    </>
  );
}
export default MultipleImgUpload;
