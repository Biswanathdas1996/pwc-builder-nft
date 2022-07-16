import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import OfflineShareIcon from "@mui/icons-material/OfflineShare";
import {
  getContractAddress,
  getcurrentNetworkId,
} from "../../CONTRACT-ABI/connect";

import { openSeaURI } from "../../config";

export default function RedirectToOpenSea({ tokenId }) {
  const [address, setAddress] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAddress(), []);

  const getAddress = async () => {
    const networkIddarta = await getcurrentNetworkId();
    const cureentAccress = getContractAddress(networkIddarta);
    setAddress(cureentAccress);
  };

  return (
    <>
      <a
        href={openSeaURI(address, tokenId)}
        target="_blank"
        rel="noreferrer"
        title="View on OpenSea"
      >
        <IconButton>
          <OfflineShareIcon
            style={{
              color: "#0578EC",
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "3px",
              //   fontSize: "15px",
            }}
          />
        </IconButton>
      </a>
    </>
  );
}
