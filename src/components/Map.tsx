import React, { MouseEventHandler, useState } from 'react';
import {
  LayersControl,
  MapContainer,
  TileLayer,
  WMSTileLayer,
  GeoJSON,
  Circle,
  Pane,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Input } from '@chakra-ui/react';
import L from 'leaflet';

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
    key: 2,
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

  const localWmsLayer: IWmsLayer = {
    key: 1,
    url: 'https://geoservermv.map-viewer-app.williamcondori.work/geoserver/map-viewer/wms',
    layers: '',
    format: 'image/png',
    isTransparent: true,
    attribution: '&copy; <a href="https://williamcondori.work" target="_blank">William Condori Quispe</a>',
    version: '1.1.1',
  };

  const [layers, setLayers] = useState<string[]>([]);

  const [wmsLayers] = useState<IWmsLayer[]>([localWmsLayer]);

  const handleClick = (): void => {
    let lyr = document.getElementsByName('layerName')[0].value;
    lyr = `map-viewer:${lyr}`;
    if (lyr) {
      setLayers([...layers, lyr]);
      document.getElementsByName('layerName')[0].value = '';
    }
  };

  const handleDeleteLayer = (): void => {
    setLayers([]);
  };

  const [feature, setFeature] = useState(undefined);

  const handleQuery = (): void => {
    fetch('http://127.0.0.1:8000/api/querylayers?name=puerto_maldonado', {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((response) => response.json())
      .then((json) => {
        setFeature(json);
      });
  };

  const onEachFeature = (feature, layer):void => {
    if (feature.properties) {
      const table = document.createElement('table');
      const tbody = document.createElement('tbody');
      table.appendChild(tbody);
      for (const key in feature.properties) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td1.innerHTML = key;
        td2.innerHTML = feature.properties[key];
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
      }
      layer.bindPopup(table.outerHTML);
    }
  };

  return (
    <>
      <Input name="layerName" />
      <Button colorScheme="blue" onClick={handleClick}>Agregar capa</Button>
      <Button colorScheme="red" onClick={handleDeleteLayer}>Limpiar capas</Button>
      <Button colorScheme="teal" onClick={handleQuery}>Consultar</Button>
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
            transparent={wmsLayer.isTransparent}
            format={wmsLayer.format}
            attribution={wmsLayer.attribution}
            zIndex={999}
            params={{
              layers: layers.join(','),
            }}
          />
        ))
      }
        {
        feature && (
        <GeoJSON
          data={feature}
          onEachFeature={onEachFeature}
          pointToLayer={(_, latlng) => L.circleMarker(latlng, {
            radius: 5,
            color: 'red',
            fillColor: 'red',
            fillOpacity: 0.5,
          })}
        />
        )
        }
      </MapContainer>
    </>
  );
}

Map.defaultProps = {
  className: null,
};
