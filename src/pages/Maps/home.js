import { useState, useEffect, useRef } from 'react';
import useNetwork from '@/data/network';
import styles from '@/styles/Maps/Home.module.css';
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
import 'ol/ol.css';
import { useRouter } from 'next/router';
import { defaults as defaultInteractions, DragPan, MouseWheelZoom } from 'ol/interaction';
import ReactLoading from 'react-loading';

export default function Home() {
  const { network, isLoading, isError } = useNetwork();
  const mapRefs = useRef([]);
  const router = useRouter();

  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (!isLoading && !isError && network && network.stations) {
      const sortedStations = network.stations.slice().sort((a, b) => {
        const aFavorite = favorites[a.id] || false;
        const bFavorite = favorites[b.id] || false;
        if (aFavorite && !bFavorite) return -1;
        if (!aFavorite && bFavorite) return 1;
        return 0;
      });

      sortedStations.forEach((station, index) => {
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
          target: `map-${station.id}`,
          controls: [],
          interactions: defaultInteractions({
            dragPan: false, // Schakel slepen uit
            mouseWheelZoom: false, // Schakel zoomen met muiswiel uit
          }).extend([
            // Voeg alleen muisbeweging toe
            new DragPan({
              condition: function (event) {
                return event.originalEvent.altKey;
              },
            }),
          ]),
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
        mapRefs.current[index] = map;
      });
    }
  }, [network, isLoading, isError, favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const updatedFavorites = { ...prev, [id]: !prev[id] };
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  if (isLoading) {
    return (
        <div className={styles.loadingContainer}>
            <ReactLoading type="spin" color="#fd7014" height={100} width={50} />
        </div>
    );
}
  if (isError) return <div>Error</div>;

  const formatStationName = (name) => {
    return name.replace(/^\d+\s*-\s*/, '');
  };

  const totalAvailableBikes = network.stations.reduce((sum, station) => sum + station.free_bikes, 0);
  const totalEmptySlots = network.stations.reduce((sum, station) => sum + station.empty_slots, 0);
  const totalBikes = totalAvailableBikes + totalEmptySlots;

  return (
    <div>
      <div className={styles.container}>
        {network && network.stations && network.stations.map((station, index) => (
          <div key={station.id} className={styles.stationContainer}>
            <div className={styles.mapContainer}>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`} target="_blank" rel="noopener noreferrer">
                <div id={`map-${station.id}`} className={styles.map}></div>
              </a>
            </div>
            <div className={styles.stationDetails}>
              <div className={styles.stationName}>
                <a href={`/stations/${station.id}`} className={styles.stationLink}>
                  {formatStationName(station.name)}
                </a>
              </div>
              <div className={styles.availableBikes}>
                <Image
                  src={favorites[station.id] ? '/favorites-filled.svg' : '/favorites-orange.svg'}
                  alt="favorite"
                  className={styles.heartIcon}
                  onClick={() => toggleFavorite(station.id)}
                  width={24}
                  height={24}
                />
                <span className={styles.bikeCount}>
                  {station.free_bikes}
                  <Image src="/fiets.svg" alt="bike" width={20} height={17} className={styles.bikeIcon}/>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
      <div>
        <h1 className={styles.whiteTitle}>Leuke weetjes</h1>
        <div className={styles.extraInfoContainer}>
          <h2 className={styles.title}>Totalen</h2>
          <div className={styles.extraInfoBox}>
            <span>Beschikbare fietsen: {totalAvailableBikes}</span>
            <span>Lege plaatsen: {totalEmptySlots}</span>
          </div>
        </div>
        <div className={styles.extraInfoContainer}>
          <h2 className={styles.title}>Fietsen in totaal</h2>
          <div className={styles.extraInfoBox}>
            <span>Totaal aantal fietsen: {totalBikes}</span>
          </div>
        </div>
        <div className={styles.extraInfoContainer}>
          <h2 className={styles.title}>Totaal aantal stations</h2>
          <div className={styles.extraInfoBox}>
            <span>Totaal aantal locaties: {network.stations.length}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}