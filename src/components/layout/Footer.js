import React from "react";
import FooterWrapper from "../Footer/FooterWrapper";
import FooterRow from "../Footer/FooterRow";
import FooterColumn from "../Footer/FooterColumn";
import FooterLink from "../Footer/FooterLink";
import PwcLogo from "../../assets/images/nft.png";
import Link from "@mui/material/Link";

function FooterCompound() {
  return (
    <FooterWrapper>
      <FooterRow>
        <FooterColumn style={{ margin: 20 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={PwcLogo} height={"60px"} width={"60px"} alt="img" />
          </Link>
          <h3 style={{ marginTop: 20 }}>OpenPwC</h3>
          <FooterLink>
            Discover, collect, and sell extraordinary NFTs. OpenPwc is the
            world's first and largest NFT marketplace
          </FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterLink>Help Center</FooterLink>
          <FooterLink>Jobs</FooterLink>
          <FooterLink>Cookie Preferences</FooterLink>
          <FooterLink>Legal Notices</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterLink>Account</FooterLink>
          <FooterLink>Ways to Watch</FooterLink>
          <FooterLink>Corporate Information</FooterLink>
          <FooterLink>Netflix Originals</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterLink>Media Center</FooterLink>
          <FooterLink>Terms of Use</FooterLink>
          <FooterLink>Contact Us</FooterLink>
        </FooterColumn>
      </FooterRow>
    </FooterWrapper>
  );
}

export default FooterCompound;
