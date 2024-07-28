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

const UpdateMapView = ({ selectedTherapist, userLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedTherapist && selectedTherapist.lat && selectedTherapist.lng) {
      console.log(`Updating map view to therapist location: ${selectedTherapist.lat}, ${selectedTherapist.lng}`);
      map.setView([selectedTherapist.lat, selectedTherapist.lng], 14);
    } else if (userLocation) {
      console.log(`Updating map view to user location: ${userLocation.lat}, ${userLocation.lng}`);
      map.setView([userLocation.lat, userLocation.lng], 14);
    }
  }, [selectedTherapist, userLocation, map]);

  return null;
};

const Map = ({ markers, userLocation, selectedTherapist }) => {
  useEffect(() => {
    console.log('Markers:', markers);
  }, [markers]);

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
      <UpdateMapView selectedTherapist={selectedTherapist} userLocation={userLocation} />
    </MapContainer>
  );
};

export default Map;
