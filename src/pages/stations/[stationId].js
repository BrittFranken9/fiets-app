import { useEffect, useRef } from 'react';
import useNetwork from '@/data/network';
import styles from '@/styles/StationId.module.css';
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
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function StationDetail() {
  const { network, isLoading, isError } = useNetwork();
  const router = useRouter();
  const mapRef = useRef();
  const markerRef = useRef(null);

  useEffect(() => {
    if (!isLoading && !isError && network && network.stations && network.stations.length > 0) {
      const station = network.stations[0];
      const map = new Map({
        view: new View({
          center: fromLonLat([station.longitude, station.latitude]),
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

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [marker],
        }),
      });

      map.addLayer(vectorLayer);

      markerRef.current = marker;

      return () => {
        map.setTarget(null);
        markerRef.current = null;
      };
    }
  }, [network, isLoading, isError]);


  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const station = network.stations.find(station => station.id === router.query.stationId);

  function removeLeadingDigits(name) {
    return name.replace(/^\d+\s*-\s*/, '');
  }

  return (
    <div className={styles.stationDetail}>
      <h1 className={styles.hoofd}>{removeLeadingDigits(station.name)}</h1>
      <div className={styles['map-container']}>
        <div ref={mapRef} className={styles.map}></div>
      </div>
      <p>{station.free_bikes} bikes available</p>
    </div>
  );
}