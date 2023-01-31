import React from "react";
import Map from "react-map-gl";

export default function UseMap({
  accessToken,
  defLat,
  defLong,
  defZoom,
  mapStyle,
  setSelectedProfile,
  children,
}: {
  accessToken: string;
  defLat: number;
  defLong: number;
  defZoom: number;
  mapStyle: string;
  setSelectedProfile: any;
  children: any;
}) {
  const handleMapClick = (e: any) => {
    setSelectedProfile(null);
  };

  return (
    <div>
      <Map
        id="map"
        initialViewState={{
          latitude: defLat,
          longitude: defLong,
          zoom: defZoom,
        }}
        onClick={handleMapClick}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={mapStyle}
        mapboxAccessToken={accessToken}
      >
        {children}
      </Map>
    </div>
  );
}
