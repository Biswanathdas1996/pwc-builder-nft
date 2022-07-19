import React, { useEffect, useState } from "react";
import { TabPanel } from "@mui/lab";
import { _fetch, _transction_signed } from "../../CONTRACT-ABI/connect";
import { Card, Grid } from "@mui/material";
import CardActionArea from "@material-ui/core/CardActionArea";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { getTokenListingState } from "../../utils/tokenListingState";
import TransctionModal from "../shared/TransctionModal";

const AccessablitySettings = ({ tokenId }) => {
  const [tokenListingState, setTokenListingState] = useState(null);

  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  useEffect(() => {
    fetchNftInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchNftInfo() {
    const getTokenListingState = await _fetch("getTokenListingState", tokenId);
    setTokenListingState(getTokenListingState?.tokenState);
  }

  const saveData = async (valueState) => {
    setStart(true);
    const responseData = await _transction_signed(
      "setTokenListingState",
      tokenId,
      valueState
    );
    setResponse(responseData);
    fetchNftInfo();
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
  };

  return (
    <TabPanel
      value="4"
      sx={{
        backgroundColor: "#F0F6FF",
        width: "100%",
        height: 400,
        overflow: "auto",
      }}
    >
      {start && <TransctionModal response={response} modalClose={modalClose} />}

      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{ marginTop: 20 }}
      >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card style={{ margin: 5 }}>
            <CardActionArea>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{ marginTop: 10 }}
              >
                <div
                  className="form-group"
                  style={{ marginLeft: 10, marginTop: 10 }}
                >
                  <FormControl component="fieldset">
                    <label for="title" className="my-2">
                      Update accessability{" "}
                    </label>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={tokenListingState}
                      onChange={(event) => {
                        saveData(event.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label={getTokenListingState("1")}
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label={getTokenListingState("2")}
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label={getTokenListingState("3")}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default AccessablitySettings;
