import React from "react";
import "../../styles/background.css";

function HeaderWrapper({ children, ...restProps }) {
  return <header {...restProps}>{children}</header>;
}

export default HeaderWrapper;
