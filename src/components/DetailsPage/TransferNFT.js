import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Grid } from "@mui/material";
import { _transction, _fetch } from "../../CONTRACT-ABI/connect";
import TransctionModal from "../shared/TransctionModal";

const VendorSchema = Yup.object().shape({
  sendTo: Yup.string().required("Send address is required"),
});

const TransferNFT = ({ price, tokenId, fetchNftInfo }) => {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    fetchAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAllPosts() {
    const getOwner = await _fetch("ownerOf", tokenId);

    setOwner(getOwner);
  }

  const saveData = async ({ sendTo }) => {
    setStart(true);
    console.log(owner, sendTo, tokenId);
    const responseData = await _transction(
      "transferFrom",
      owner,
      sendTo,
      tokenId
    );
    setResponse(responseData);
    fetchNftInfo();
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
  };

  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}

      <div
        style={{
          background: "white",
        }}
      >
        <Formik
          initialValues={{
            sendTo: "",
          }}
          validationSchema={VendorSchema}
          onSubmit={(values, { setSubmitting }) => {
            saveData(values);
            setSubmitting(false);
          }}
        >
          {({ touched, errors, isSubmitting, values }) => (
            <Form>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="form-group" style={{ float: "right" }}>
                    <Field
                      type="text"
                      name="sendTo"
                      autoComplete="flase"
                      placeholder="Reciever address"
                      className={`form-control text-muted ${
                        touched?.sendTo && errors?.sendTo ? "is-invalid" : ""
                      }`}
                      style={{ padding: 6 }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="form-group" style={{ float: "left" }}>
                    <span className="input-group-btn">
                      <input
                        className="btn btn-default btn-secondary"
                        type="submit"
                        value={"Transfer Nft"}
                      />
                    </span>
                  </div>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default TransferNFT;
