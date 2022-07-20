import VisibilityIcon from "@material-ui/icons/Visibility";
import VpnLockIcon from "@material-ui/icons/VpnLock";
import ShopTwoIcon from "@material-ui/icons/ShopTwo";
import { Tooltip } from "@mui/material";

export const allStates = [
  {
    id: "1",
    type: "List on marketplace and enable transction",
    value: "Listable",
  },
  {
    id: "2",
    type: "List on marketplace and disable transction",
    value: "Visible",
  },
  {
    id: "3",
    type: "Private",
    value: "Privet",
  },
];

export const accessablity = {
  Listable: "1",
  Visible: "2",
  Privet: "3",
};

export const badgeUI = (listingState) => {
  if (listingState === "3") {
    return (
      <>
        <Tooltip title={getTokenListingState(listingState)}>
          <VpnLockIcon
            style={{ color: "#bf5a00d6", fontSize: 20, margin: 5 }}
          />
        </Tooltip>
      </>
    );
  } else if (listingState === "2") {
    return (
      <>
        <Tooltip title={getTokenListingState(listingState)}>
          <VisibilityIcon
            style={{ color: "#bf5a00d6", fontSize: 20, margin: 5 }}
          />
        </Tooltip>
      </>
    );
  } else if (listingState === "1") {
    return (
      <>
        <Tooltip title={getTokenListingState(listingState)}>
          <ShopTwoIcon style={{ color: "rgb(149 99 2)", fontSize: 20 }} />
        </Tooltip>
      </>
    );
  }
};

export const getTokenListingState = (id) => {
  const filterData = allStates.find((val) => val.id === id);
  return filterData?.type;
};
