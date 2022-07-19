import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Grid } from "@mui/material";
import { _transction_signed } from "../../CONTRACT-ABI/connect";
import TransctionModal from "../shared/TransctionModal";
import Web3 from "web3";
import { getSymbol } from "../../utils/currencySymbol";

const web3 = new Web3(window.ethereum);

const VendorSchema = Yup.object().shape({
  amount: Yup.string().required("Amount is required"),
});

const UpdatePrice = ({ price, tokenId, fetchNftInfo }) => {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);

  const saveData = async ({ amount }) => {
    setStart(true);
    let responseData;

    responseData = await _transction_signed(
      "_setNftPrice",
      tokenId,
      web3.utils.toWei(amount.toString(), "ether")
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
            amount: web3.utils.fromWei(price.toString(), "ether"),
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
                      name="amount"
                      autoComplete="flase"
                      placeholder={`Enter amount (${getSymbol()})`}
                      className={`form-control text-muted ${
                        touched.amount && errors.amount ? "is-invalid" : ""
                      }`}
                      style={{ marginRight: 10, padding: 6 }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="form-group" style={{ float: "left" }}>
                    <span className="input-group-btn">
                      <input
                        className="btn btn-default btn-primary"
                        type="submit"
                        value={"Update Price"}
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
export default UpdatePrice;
