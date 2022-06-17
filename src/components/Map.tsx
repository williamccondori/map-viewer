import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  className?: string;
}

export default function Map({ className }:MapProps): JSX.Element {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup.
          {' '}
          <br />
          {' '}
          Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

Map.defaultProps = {
  className: null,
};
