import React, { MouseEventHandler, useState } from 'react';
import {
  LayersControl,
  MapContainer,
  TileLayer,
  WMSTileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@chakra-ui/react';

interface MapProps {
  className?: string;
}

export default function Map({ className }:MapProps): JSX.Element {
  const [baseMaps] = useState([{
    key: 1,
    name: 'MapBox',
    isDefault: true,
    tileSize: 512,
    zoomOffset: -1,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, '
    + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    url: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  }, {
    key: 1,
    name: 'MapBox Satellite',
    isDefault: false,
    tileSize: 512,
    zoomOffset: -1,
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v11',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, '
    + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    url: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  }]);

  interface IWmsLayer{
    key: number;
    url: string;
    layers: string;
    format: string;
    isTransparent: boolean;
    attribution: string;
    version: string;
  }

  const defaultWmsLayers: IWmsLayer = {
    key: 1,
    url: 'http://ide.regionmadrededios.gob.pe:9001/geoserver/goremadide/wms',
    layers: 'goremadide:distritos,goremadide:prueba_shapefile_2022',
    format: 'image/png',
    isTransparent: true,
    attribution: '&copy; <a href="http://ide.regionmadrededios.gob.pe/portal/" target="_blank">Gobierno Regional de Madre de Dios</a>',
    version: '1.1.1',
  };

  const [wmsLayers, setWmsLayers] = useState([defaultWmsLayers]);

  const handleClick = (actualServices: IWmsLayer[]): any => {
    const actualService:IWmsLayer = actualServices[0];
    actualService.layers = 'goremadide:distritos';
    setWmsLayers([actualService]);
  };

  return (
    <>
      {/* <Button colorScheme="blue" onClick={() => handleClick(wmsLayers)}>Click me!</Button> */}
      <MapContainer center={[-10.1884015, -75.6500792]} zoom={6} className={className}>
        <LayersControl position="topright">
          {
        baseMaps.map((baseMap) => (
          <LayersControl.BaseLayer
            checked={baseMap.isDefault}
            key={baseMap.key}
            name={baseMap.name}
          >
            <TileLayer
              id={baseMap.id}
              attribution={baseMap.attribution}
              url={baseMap.url}
              tileSize={baseMap.tileSize}
              zoomOffset={baseMap.zoomOffset}
              maxZoom={baseMap.maxZoom}
              zIndex={0}
            />
          </LayersControl.BaseLayer>
        ))
      }
        </LayersControl>
        {
        wmsLayers.map((wmsLayer) => (
          <WMSTileLayer
            key={wmsLayer.key}
            url={wmsLayer.url}
            layers={wmsLayer.layers}
            transparent={wmsLayer.isTransparent}
            format={wmsLayer.format}
            attribution={wmsLayer.attribution}
            zIndex={999}
          />
        ))
      }
      </MapContainer>
    </>
  );
}

Map.defaultProps = {
  className: null,
};
