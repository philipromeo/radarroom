import React, { useRef } from "react";

import "./Map.css";

const Map = props => {
  const mapRef = useRef();

  const { center, zoom, location } = props;

  try {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
      location: location
    });

    location.map(location => {
      location.lat = parseFloat(location.lat);
      location.lng = parseFloat(location.lng);
        return new window.google.maps.Marker({ position: location, map: map, center: location });
    })
 } catch (err) {
    console.log(err);
  }

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      location={props.location}
      style={props.style}
    ></div>
  );
};

export default Map;
