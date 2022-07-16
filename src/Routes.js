import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import PublishArt from "./Pages/PublishArt";
import SingleNFT from "./Pages/SingleNFT";
import FractionalNFT from "./Pages/FractionalNFT";
import ChooseNFT from "./components/FractionalNFT/ChooseNFT";
import CreateFraction from "./components/FractionalNFT/CreateFraction";
import MyFractionalNFT from "./components/FractionalNFT/MyFractionalNFT";

import DetailsPage from "./Pages/DetailsPage";
import TopSelling from "./Pages/TopSelling";
import CategoryWiseList from "./Pages/CategoryWiseList";
import Profile from "./Pages/Profile";
import HowITworks from "./Pages/HowITworks";

class Routing extends React.Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/publishArt" element={<PublishArt />} />
        <Route exact path="/nft-mint" element={<SingleNFT />} />
        <Route exact path="/fractional-nft-mint" element={<FractionalNFT />} />
        <Route
          exact
          path="/choose-fractional-nft-mint"
          element={<ChooseNFT />}
        />
        <Route
          exact
          path="/create-fractional-nft-mint"
          element={<CreateFraction />}
        />
        <Route exact path="/my-fractional-nft" element={<MyFractionalNFT />} />

        <Route exact path="/details/:tokenId" element={<DetailsPage />} />
        <Route
          exact
          path="/category/:category"
          element={<CategoryWiseList />}
        />
        <Route exact path="/top-selling" element={<TopSelling />} />

        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/HowItWorks" element={<HowITworks />} />

        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Routes>
    );
  }
}

export default Routing;
