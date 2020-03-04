import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../Shared/Hooks/http-hook";

import ElementList from "../Components/ElementList";
// import HomeMap from "./HomeMap";
import Map from "./Map";

import Card from "../../Shared/Components/UIElements/Card";
import Input from "../../Shared/Components/FormElements/Input";
import RangeSlider from "../../Shared/Components/FormElements/RangeSlider";
import Button from "../../Shared/Components/FormElements/Button";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { usePosition } from "../../Shared/Components/UIElements/UsePosition";

import { VALIDATOR_TRUE } from "../../Shared/Util/Validators";
import { useForm } from "../../Shared/Hooks/form-hook";

import "./inputBar.css";

const InputBar = () => {
  const [searchedPlaces, setLoadedPlaces] = useState();
  const [MarkersMap, setMarkersMap] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/search"
        );
        setLoadedPlaces(responseData.elements);
        let locations = [];
        responseData.elements.map(element => {
        element.location.lat = parseFloat(element.location.lat);
        element.location.lng = parseFloat(element.location.lng);
          locations.push(element.location);
          return locations;
        });
        setMarkersMap(locations);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest]);

  const [formState, inputHandler] = useForm(
    {
      address: {
        value: "",
        isValid: false
      },
      price: {
        value: "",
        isValid: false
      },
      leaseTime: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const SearchSubmitHandler = async event => {
    event.preventDefault();
    try {
      let responseData = await fetch("http://localhost:5000/api/search?", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: formState.inputs.address.value.toLowerCase(),
          price: formState.inputs.price.value.toLowerCase(),
          leaseTime: formState.inputs.leaseTime.value.toLowerCase()
        })
      });

      let fetchPlaces = await responseData.json();
      setLoadedPlaces(fetchPlaces.elements);
      let locations = [];
      fetchPlaces.elements.map(element => {
        element.location.lat = parseFloat(element.location.lat);
        element.location.lng = parseFloat(element.location.lng);
        locations.push(element.location);
        return locations;
      });

      setMarkersMap(locations);

    } catch (err) {
      console.log(err);
    }
  };

  let { latitude, longitude } = usePosition();

  latitude = Number(latitude);
  longitude = Number(longitude);

  if (!latitude || !longitude) {
    latitude = 51.5075082;
    longitude = -0.1286135;
  }

  return (
    <React.Fragment>
      <div className="navbar-search-front">
        <Card className="search-container">
          <div className="input-filter-container">
            <form onSubmit={SearchSubmitHandler}>
              <Input
                id="address"
                element="input"
                type="text"
                label="Search for..."
                validators={[VALIDATOR_TRUE()]}
                errorText="Please enter a valid research item."
                onInput={inputHandler}
              />
              <div className="dropdown">
                <Button type="button" inverse>
                  Price
                </Button>
                <div className="dropdown-content">
                  <RangeSlider
                    id="price"
                    element="input"
                    type="range"
                    min="1"
                    max="1000"
                    value={"50"}
                    label={"Price max "}
                    validators={[VALIDATOR_TRUE()]}
                    errorText="Please enter a valid research item."
                    onInput={inputHandler}
                    step="1"
                  />
                </div>
              </div>

              <div className="dropdown">
                <Button type="button" inverse>
                  Period
                </Button>
                <div className="dropdown-content-guest">
                  <RangeSlider
                    id="leaseTime"
                    element="input"
                    type="range"
                    min="1"
                    max="6"
                    value={"1"}
                    label={"Month min "}
                    validators={[VALIDATOR_TRUE()]}
                    errorText="Please enter a valid research item."
                    onInput={inputHandler}
                    step="1"
                  />
                </div>
              </div>
            </form>
            <Button
              inverse
              type="submit"
              id="submitButton"
              onClick={SearchSubmitHandler}
            >
              Submit
            </Button>
          </div>
        </Card>
      </div>

      <div className="element-list-home">
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && searchedPlaces && <ElementList items={searchedPlaces} />}
      </div>
      <div>{/* <HomeMap /> */}</div>
      <div>
        <Map
          className="HomeMap"
          center={{
            lat: latitude,
            lng: longitude
          }}
          zoom={8}
          location={MarkersMap}
        ></Map>
      </div>
    </React.Fragment>
  );
};

export default InputBar;
