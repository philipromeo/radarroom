import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../Shared/Hooks/http-hook";

import Map from "../Components/Map";

import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";

import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import ElementList from "../Components/ElementList";
import InputBar from "../Components/InputBar";

import { usePosition } from "../../Shared/Components/UIElements/UsePosition";

import "./Home.css";

const Home = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [searchedPlaces, setLoadedPlaces] = useState();
  const [MarkersMap, setMarkersMap] = useState([{lat: 39.305, lng: -76.617}]);

  //                              ***      useEffect      ***

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/search"
        );
        return responseData;
      } catch (err) {}
    };
    fetchPlaces()
         .then(response => {
          ResponseDataHandler(response);
    });
  }, [sendRequest]);

  //                              ***      Request      ***

  const inputsHandler = async val => {
    try {
      let responseData = await fetch("http://localhost:5000/api/search?", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: val.address.value.toLowerCase(),
          price: val.price.value.toLowerCase(),
          leaseTime: val.leaseTime.value.toLowerCase()
        })
      });
      const data = await responseData;
      return data.json().then(response => {
        ResponseDataHandler(response);
      });
    } catch (err) {
      console.log(err);
    }
  };

  //                              ***      ResponseDataHandler     ***

  const ResponseDataHandler =  responseData => {

    setLoadedPlaces(responseData.elements);
    const locations = [];
    Object.values(responseData.elements).forEach(function(value) {
      locations.push(value.location);
      return locations;
  });
    setMarkersMap(locations);
  };

  //                              ***      geolocationHandler     ***

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
        <InputBar inputsCallback={inputsHandler} />
      </div>

      <div className="element-list-home">
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="loadCenter">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && searchedPlaces && <ElementList items={searchedPlaces} />}
      </div>

      <div className="HomeMap">
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="loadCenter">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && MarkersMap && <Map
              center={{
                lat: latitude,
                lng: longitude
              }}
              zoom={8}
              location={MarkersMap}
            />}
      </div>
    </React.Fragment>
  );
};

export default Home;
