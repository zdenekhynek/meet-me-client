import React, { useState } from "react";
import "./App.css";

import Map from "./Map.js";

export const createMarkerFromLatLng = (latLng) => {
  return { lat: latLng.lat(), lng: latLng.lng() };
};

function App() {
  const [markers, setMarkers] = useState([
    { lat: 51.5, lng: 0 },
    { lat: 51.55, lng: 0 },
  ]);

  const addMarker = (evt) => {
    const marker = createMarkerFromLatLng(evt.latLng);
    const newMarkers = [...markers, marker];
    setMarkers(newMarkers);
  };

  const onMarkerMove = (index, evt) => {
    const marker = createMarkerFromLatLng(evt.latLng);
    const newMarkers = [
      ...markers.slice(0, index),
      marker,
      ...markers.slice(index + 1),
    ];
    setMarkers(newMarkers);
  };

  const onMarkerRightClick = (index, evt) => {
    //  remove marker
    const newMarkers = [
      ...markers.slice(0, index),
      ...markers.slice(index + 1),
    ];
    setMarkers(newMarkers);
  };

  const mapProps = {
    markers,
    callbacks: {
      onDblClick: addMarker,
    },
    onMarkerRightClick,
    onMarkerMove,
  };

  return (
    <div className="App">
      <Map
        {...mapProps}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `800px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default App;
