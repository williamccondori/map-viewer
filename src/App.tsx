import React from 'react';
import './App.css';
import Map from './components/Map';
import WelcomeModal from './components/WelcomeModal';

export default function App(): JSX.Element {
  return (
    <>
      <Map className="map" />
      <WelcomeModal />
    </>
  );
}
