import React from "react";
import "./FooterStyles.css";

function FooterLink({ children, ...restProps }) {
  return (
    <a
      href="/"
      className="footer-link"
      {...restProps}
      style={{ textDecoration: "none", color: "#ded9d9" }}
    >
      {children}
    </a>
  );
}

export default FooterLink;
