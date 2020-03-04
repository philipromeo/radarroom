import React, { useRef } from "react";

import "./Map.css";

const Map = props => {
  const mapRef = useRef();

  const { center, zoom } = props;

  try {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });

    new window.google.maps.Marker({ position: center, map: map });
  } catch (err) {
    console.log(err);
  }

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
