import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const greyPinSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin">
    <path d="M21 10c0 6.5-9 12-9 12s-9-5.5-9-12a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>`;

const redPinSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin">
    <path d="M21 10c0 6.5-9 12-9 12s-9-5.5-9-12a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>`;

const createIcon = (color) => {
  return new L.DivIcon({
    html: color === 'red' ? redPinSvg : greyPinSvg,
    iconSize: [32, 32],
    className: ''
  });
};

const UpdateMapView = ({ userLocation, selectedTherapist }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedTherapist && selectedTherapist.address.length > 0) {
      const { lat, lng } = selectedTherapist.address[0];
      map.setView([lat, lng], 14);
    } else if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 14);
    }
  }, [userLocation, selectedTherapist, map]);
  return null;
};

const Map = ({ markers, userLocation, selectedTherapist }) => {
  return (
    <MapContainer center={[31.0461, 34.8516]} zoom={8} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={createIcon(marker.isSelected ? 'red' : 'grey')}
        >
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
      <UpdateMapView userLocation={userLocation} selectedTherapist={selectedTherapist} />
    </MapContainer>
  );
};

export default Map;
