import React from "react";
import "./HeaderStyles.css";
import PwcLogo from "../../assets/images/nft.png";
function Logo({ children, ...restProps }) {
  return (
    <div>
      <a href="/" {...restProps}>
        {children}
        <img className="logo" href="/" src={PwcLogo} alt=" logo" />
      </a>
    </div>
  );
}

export default Logo;
