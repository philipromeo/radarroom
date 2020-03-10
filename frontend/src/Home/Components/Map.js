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
    Object.values(location).forEach(function(value) {
      return new window.google.maps.Marker({ position: value, map: map });
  });

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