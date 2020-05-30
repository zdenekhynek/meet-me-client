import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Polyline } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "800px",
};

export const convertArrayToLatLng = (arr) => {
  return arr.map(([lat, lng]) => ({ lat, lng }));
};

export const Map = ({
  markers = [],
  polylines = [],
  callbacks = {},
  onMarkerRightClick = () => {},
  onMarkerMove = () => {},
}) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      loadingElement={<div style={{ height: `100%` }} />}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        center={{ lat: 51.5, lng: 0 }}
        options={{ disableDoubleClickZoom: true }}
        {...callbacks}
      >
        {markers.map((marker, i) => {
          return (
            <Marker
              key={i}
              position={{ lat: marker.lat, lng: marker.lng }}
              onRightClick={(evt) => onMarkerRightClick(i, evt)}
              onDragEnd={(evt) => onMarkerMove(i, evt)}
              draggable
            />
          );
        })}
        {polylines.map((polyline, i) => {
          const path = convertArrayToLatLng(polyline);
          return <Polyline key={i} path={path} />;
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map; //withScriptjs(withGoogleMap(Map));
