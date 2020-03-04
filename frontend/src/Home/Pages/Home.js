import React from "react";
import { useHttpClient } from "../../Shared/Hooks/http-hook";

// import Map from "../../Shared/Components/UIElements/Map";

import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import InputBar from "../Components/InputBar";

import { usePosition } from "../../Shared/Components/UIElements/UsePosition";

import "./Home.css";

const Home = () => {
  const { isLoading } = useHttpClient();

  let { latitude, longitude } = usePosition();

  latitude = Number(latitude);
  longitude = Number(longitude);

  if (!latitude || !longitude) {
    latitude = 51.5075082;
    longitude = -0.1286135;
  }

  return (
    <React.Fragment>
      <div className="navbar-list-front">
        <InputBar />
      </div>
      {isLoading && (
        <div className="HomeMap center">
          <LoadingSpinner />
        </div>
      )}
      {/* {!isLoading && (
        <Map
          className="HomeMap"
          center={{
            lat: latitude,
            lng: longitude
          }}
          zoom={12}
        ></Map>
      )} */}
    </React.Fragment>
  );
};

export default Home;
