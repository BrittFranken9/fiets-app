import { useState, useEffect, useRef } from 'react';
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
import { Style, Icon } from 'ol/style.js';
import Image from 'next/image';
import 'ol/ol.css'; // Zorg ervoor dat je de OpenLayers CSS importeert
import { useRouter } from 'next/router';

export default function Home() {
  const { network, isLoading, isError } = useNetwork();
  const mapRefs = useRef([]);
  const router = useRouter();

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
          target: `map-${index}`,
          controls: [], // Verwijder alle standaardcontroles
        });

        const marker = new Feature({
          geometry: new Point(fromLonLat([station.longitude, station.latitude])),
        });

        marker.setStyle(
          new Style({
            image: new Icon({
              src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M 0,16 L 12,24 L 24,16 Z" fill="black"/></svg>',
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
        mapRefs.current[index] = map;
      });
    }
  }, [network, isLoading, isError]);

  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (index) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (isLoading) return <div>loading ...</div>;
  if (isError) return <div>error</div>;

  const formatStationName = (name) => {
    return name.replace(/^\d+\s*-\s*/, '');
  };

  return (
    <div className={styles.container}>
      {network.stations.map((station, index) => (
        <div key={index} className={styles.stationContainer}>
          <div className={styles.mapContainer}>
            <div id={`map-${index}`} className={styles.map}></div>
          </div>
          <div className={styles.stationDetails}>
            <div className={styles.stationName}>
              <a href={`/stations/${station.id}`} className={styles.stationLink}>
                {formatStationName(station.name)}
              </a>
            </div>
            <div className={styles.availableBikes}>
              <Image
                src={favorites[index] ? '/favorites-filled.svg' : '/favorites.svg'}
                alt="favorite"
                className={styles.heartIcon}
                onClick={() => toggleFavorite(index)}
                width={24}
                height={24}
              />
              {station.free_bikes}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}