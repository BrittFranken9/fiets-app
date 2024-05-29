import { useEffect, useRef } from 'react';
import useNetwork from '@/data/network';
import styles from '@/styles/map.module.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';
import 'ol/ol.css';

export default function About() {
  const { network, isLoading, isError } = useNetwork();
  const mapRef = useRef();

  useEffect(() => {
    if (!isLoading && !isError && network && network.stations) {
      const map = new Map({
        view: new View({
          center: fromLonLat([network.stations[0].longitude, network.stations[0].latitude]),
          zoom: 12,
        }),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: mapRef.current,
        controls: [],
      });

      const features = network.stations.map(station => {
        const marker = new Feature({
          geometry: new Point(fromLonLat([station.longitude, station.latitude])),
        });

        marker.setStyle(
          new Style({
            image: new Icon({
              src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23fd7014" /></svg>',
              imgSize: [24, 24],
              anchor: [0.5, 1],
              anchorXUnits: 'fraction',
              anchorYUnits: 'fraction',
            }),
          })
        );

        return marker;
      });

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: features,
        }),
      });

      map.addLayer(vectorLayer);

      return () => map.setTarget(null);
    }
  }, [network, isLoading, isError]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <h1></h1>
      <div ref={mapRef} className={styles.map}></div>
    </div>
  );
}