import { useEffect, useRef } from 'react';
import styles from '@/styles/Home.module.css';
import useNetwork from '@/data/network';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { fromLonLat } from 'ol/proj.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Style, Circle, Fill } from 'ol/style.js';
import Icon from 'ol/style/Icon.js';
import Overlay from 'ol/Overlay.js';

export default function Home() {
  const { network, isLoading, isError } = useNetwork();
  const mapRefs = useRef([]);
  const vectorLayerRef = useRef(null);

  useEffect(() => {
    if (!isLoading && !isError && network) {
      network.stations.forEach((station, index) => {
        const map = new Map({
          view: new View({
            center: fromLonLat([station.longitude, station.latitude]),
            zoom: 14,
          }),
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          target: `map-${index}`, // Unieke id per kaart
        });

        const vectorLayer = new VectorLayer({
          source: new VectorSource(),
        });

        map.addLayer(vectorLayer);

        const marker = new Feature({
          geometry: new Point(fromLonLat([station.longitude, station.latitude])),
        });

        marker.setStyle(
            new Style({
              image: new Icon({
                src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M 0,16 L 12,24 L 24,16 Z" fill="black"/></svg>',
                imgSize: [24, 24], // Size of the SVG icon
                anchor: [0.5, 1], // Anchor point at the bottom center
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
              }),
              zIndex: Infinity, // Ensure the SVG is displayed on top
            })
          );

        vectorLayer.getSource().addFeature(marker);

        mapRefs.current[index] = map;
      });
    }
  }, [network, isLoading, isError]);

  if (isLoading) return <div>loading ...</div>;
  if (isError) return <div>error</div>;

  return (
    <div className={styles.container}>
      <h1>{network.location.name}</h1>
      <div className={styles.stations}>
        {network.stations.map((station, index) => (
          <div key={index} className={styles.station}>
            <div className={styles.stationName}>{station.name}</div>
            <div id={`map-${index}`} className={styles.map}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
