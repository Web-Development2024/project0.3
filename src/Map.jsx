import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const greyPinSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 24 24" fill="#808080">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>`;


  const redPinSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 24 24" fill="#622F22">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
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
