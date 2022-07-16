import React from "react";

function HeaderCompound({ children }) {
  return (
    <>
      <div class="layer">
        <div className="feature-wrapper-home">
          <div className="feature-title-home">
            Create, collect, and sell extraordinary NFTs
          </div>
        </div>
        <center>
          <h2 className="h2-sub-text">
            OpenPwc is the world's first and largest NFT marketplace
          </h2>
        </center>

        {children}
      </div>
    </>
  );
}

export default HeaderCompound;
