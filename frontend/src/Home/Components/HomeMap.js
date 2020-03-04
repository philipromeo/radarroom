import React, { Component } from "react";
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import { usePosition } from "../../Shared/Components/UIElements/UsePosition";

const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(props => {
  let { latitude, longitude } = usePosition();

  latitude = Number(latitude);
  longitude = Number(longitude);

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: latitude, lng: longitude }}
      on
    >
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker);

        return (
          <Marker
            onClick={onClick}
            position={{ lat: marker.location.lat, lng: marker.location.lng }}
          >
            {props.selectedMarker === marker && (
              <InfoWindow>
                <div>{marker.address}</div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

export default class ShelterMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      selectedMarker: false
    };
  }
  componentDidMount() {
    //fetch("https://api.harveyneeds.org/api/v1/shelters?limit=10")
    fetch(" http://api.localhost:5000/api/search")
      .then(r => r.json())
      .then(data => {
        // console.log(data)
        this.setState({ elements: data.elements });
      });
  }
  handleClick = (marker, event) => {
    console.log({ marker });
    this.setState({ selectedMarker: marker });
  };
  render() {
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.elements}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=&callback=initMap"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
