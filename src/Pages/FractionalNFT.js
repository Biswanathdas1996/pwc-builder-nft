import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Card, Grid } from "@mui/material";
import { create } from "ipfs-http-client";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Switch from "@mui/material/Switch";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import TransctionModal from "../components/shared/TransctionModal";
import HeaderWrapper from "../components/shared/BackgroundUI";
import {
  _transction_nft,
  _account,
} from "../CONTRACT-ABI/FractionalNFT/ConnectNFT";

const client = create("https://ipfs.infura.io:5001/api/v0");

const Mint = () => {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [checked, setChecked] = useState(false);
  const [description, setDescription] = useState(null);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  let history = useNavigate();

  const saveData = async ({
    title,
    authorname,
    category,
    attributes,
    price,
    royelty,
  }) => {
    setStart(true);

    const dummyAttrribute = [
      {
        display_type: "boost_number",
        trait_type: "Aqua Power",
        value: 40,
      },
      {
        display_type: "boost_percentage",
        trait_type: "Stamina Increase",
        value: 10,
      },
      {
        display_type: "number",
        trait_type: "Generation",
        value: 2,
      },
      {
        display_type: "date",
        trait_type: "publish-date",
        value: new Date(),
      },
    ];
    if (file) {
      const results = await await client.add(file);
      console.log("--img fingerpring-->", results.path);
      const metaData = {
        name: title,
        author: authorname,
        category: category,
        image: `https://ipfs.infura.io/ipfs/${results.path}`,
        description: description,
        attributes: attributes.concat(dummyAttrribute),
      };

      const resultsSaveMetaData = await await client.add(
        JSON.stringify(metaData)
      );
      console.log("---metadta-->", resultsSaveMetaData.path);
      const account = await _account();
      const response = await _transction_nft("mint", account, 1);
      history("/choose-fractional-nft-mint");
      setResponse(response);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
    history("/choose-fractional-nft-mint");
  };
  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}
      <HeaderWrapper className="header-wrapper-frac-form">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <div style={{ margin: 20 }}>
              <Card>
                <Grid container>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div
                      style={{
                        padding: "20px",
                        background: "white",
                      }}
                    >
                      <h4>Create your NFT</h4>
                      <Formik
                        initialValues={{
                          authorname: "",
                          title: "",
                          text: "",
                          category: "",
                          royelty: 0,
                          price: "",
                          attributes: [],
                        }}
                        // validationSchema={VendorSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          console.log("values=======>", values);
                          saveData(values);
                          setSubmitting(false);
                        }}
                      >
                        {({ touched, errors, isSubmitting, values }) => (
                          <Form>
                            <Grid container>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 10 }}
                                >
                                  <label for="title" className="my-2">
                                    Title <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    type="text"
                                    name="title"
                                    autoComplete="flase"
                                    placeholder="Enter title"
                                    className={`form-control text-muted ${
                                      touched.title && errors.title
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    style={{ marginRight: 10, padding: 9 }}
                                  />
                                </div>
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 10 }}
                                >
                                  <label for="title" className="my-2">
                                    Author Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    type="text"
                                    name="authorname"
                                    autoComplete="flase"
                                    placeholder="Enter Author name"
                                    className={`form-control text-muted ${
                                      touched.authorname && errors.authorname
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    style={{ marginRight: 10, padding: 9 }}
                                  />
                                </div>
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 10 }}
                                >
                                  <label for="title" className="my-2">
                                    Price <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    type="number"
                                    name="price"
                                    autoComplete="flase"
                                    placeholder="Enter price in ETH"
                                    className={`form-control text-muted ${
                                      touched.price && errors.price
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    style={{ marginRight: 10, padding: 9 }}
                                  />
                                </div>
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 10 }}
                                >
                                  <label for="title" className="my-2">
                                    Choose category{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="category"
                                    component="select"
                                    className={`form-control text-muted ${
                                      touched.category && errors.category
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    style={{ marginRight: 10, padding: 9 }}
                                  >
                                    <option>-- Please select --</option>
                                    <option value="art">Art</option>
                                    <option value="music">Music</option>
                                    <option value="sports">Sports</option>
                                  </Field>
                                </div>
                              </Grid>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 10 }}
                                >
                                  <label for="title" className="my-2">
                                    Choose file{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    className={`form-control text-muted`}
                                    type="file"
                                    onChange={onFileChange}
                                  />

                                  {selectedFile && (
                                    <center>
                                      <img
                                        src={preview}
                                        alt="img_of_nft"
                                        style={{
                                          marginTop: 20,
                                          height: 300,
                                          width: "auto",
                                        }}
                                      />
                                    </center>
                                  )}
                                </div>
                              </Grid>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 10 }}
                                >
                                  <label for="title" className="my-2">
                                    Description{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={3}
                                    name="text"
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                    placeholder="Minimum 3 rows"
                                    style={{ width: "100%" }}
                                    className={`form-control text-muted ${
                                      touched.text && errors.text
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                </div>
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 10 }}
                                >
                                  <label for="title" className="my-2">
                                    Royalty amount{" "}
                                  </label>
                                  <div style={{ float: "right" }}>
                                    <Switch
                                      checked={checked}
                                      onChange={handleChange}
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
                                    />
                                  </div>
                                  {checked && (
                                    <Field
                                      type="number"
                                      name="royelty"
                                      autoComplete="flase"
                                      placeholder="Enter royalty amount (%)"
                                      className={`form-control text-muted ${
                                        touched.royelty && errors.royelty
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      style={{ marginRight: 10, padding: 9 }}
                                    />
                                  )}
                                </div>
                              </Grid>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 10 }}
                                >
                                  <FieldArray
                                    name="attributes"
                                    render={(arrayHelpers) => (
                                      <div>
                                        {values.attributes &&
                                        values.attributes.length > 0 ? (
                                          values.attributes.map(
                                            (attribut, index) => (
                                              <div
                                                style={{
                                                  border: "1px solid #c7c9cc",
                                                  borderRadius: 5,
                                                  padding: 12,
                                                  marginTop: 15,
                                                }}
                                                key={index}
                                              >
                                                <DeleteOutlineIcon
                                                  onClick={() =>
                                                    arrayHelpers.remove(index)
                                                  }
                                                  sx={{ color: pink[500] }}
                                                  style={{
                                                    marginBottom: 10,
                                                    float: "right",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                                <Grid container>
                                                  <Grid
                                                    item
                                                    lg={5}
                                                    md={5}
                                                    sm={12}
                                                    xs={12}
                                                    style={{ marginRight: 20 }}
                                                  >
                                                    <Field
                                                      name={`attributes.${index}.trait_type`}
                                                      autoComplete="flase"
                                                      placeholder="Enter Properties name"
                                                      className={`form-control text-muted `}
                                                      style={{
                                                        marginTop: 10,
                                                        padding: 9,
                                                      }}
                                                    />
                                                  </Grid>
                                                  <Grid
                                                    item
                                                    lg={6}
                                                    md={6}
                                                    sm={12}
                                                    xs={12}
                                                  >
                                                    <Field
                                                      name={`attributes.${index}.value`}
                                                      autoComplete="flase"
                                                      placeholder="Enter value"
                                                      className={`form-control text-muted`}
                                                      style={{
                                                        marginTop: 10,
                                                        padding: 9,
                                                      }}
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </div>
                                            )
                                          )
                                        ) : (
                                          <Button
                                            variant="outlined"
                                            size="medium"
                                            type="button"
                                            onClick={() =>
                                              arrayHelpers.push("")
                                            }
                                          >
                                            {/* show this when user has removed all attributes from the list */}
                                            Add attributes
                                          </Button>
                                        )}
                                        {values.attributes.length !== 0 && (
                                          <Button
                                            variant="outlined"
                                            size="medium"
                                            type="button"
                                            onClick={() =>
                                              arrayHelpers.insert(
                                                values.attributes.length + 1,
                                                ""
                                              )
                                            }
                                            style={{
                                              marginTop: 10,
                                            }}
                                          >
                                            + Add
                                          </Button>
                                        )}
                                      </div>
                                    )}
                                  />
                                </div>
                              </Grid>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{
                                    marginLeft: 10,
                                    marginTop: 10,
                                    float: "right",
                                  }}
                                >
                                  <span className="input-group-btn">
                                    <input
                                      className="btn btn-default btn-primary float-right"
                                      type="submit"
                                      value={"Submit"}
                                    />
                                  </span>
                                </div>
                              </Grid>
                            </Grid>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
        </Grid>
      </HeaderWrapper>
    </>
  );
};
export default Mint;
