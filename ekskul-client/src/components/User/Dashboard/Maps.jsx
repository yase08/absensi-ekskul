// Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const position = [-6.645204977440087, 106.84386690919327];

  return (
    <MapContainer center={position} zoom={14} style={{ height: '150px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
