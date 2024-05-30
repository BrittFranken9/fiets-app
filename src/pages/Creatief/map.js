import { useEffect, useState } from 'react';
import useNetwork from '@/data/network';
import styles from '@/styles/Creatief/map.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function About() {
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const router = useRouter();

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetch('https://api.citybik.es/v2/networks/velo-antwerpen')
        .then((response) => response.json())
        .then((data) => {
          const stationsData = data.network.stations;
          const stationsWithDistances = stationsData.map((station) => {
            const distance = calculateDistance(
              userLocation.lat,
              userLocation.lon,
              station.latitude,
              station.longitude
            );
            return { ...station, distance };
          });
          stationsWithDistances.sort((a, b) => a.distance - b.distance);
          setStations(stationsWithDistances.slice(0, 5)); // Selecteer de eerste 5 stations
        })
        .catch((error) => {
          console.error('Error fetching station data:', error);
        });
    }
  }, [userLocation]);

  return (
    <div>
      <h1 className={styles.titel}>Stations in de buurt</h1>
      <ul className={styles.stationList}>
        {stations.map((station) => (
          <li key={station.id} className={styles.stationItem}>
            <Link href={`/station2/${station.id}`} className={styles.stationName}>
              {station.name.replace(/^\d+\s*-\s*/, '')}
            </Link>
            <div className={styles.distanceLine}>
              <div className={styles.distanceDot}></div>
              <div className={styles.distanceLineInner} style={{ width: `${(station.distance / 18 * 100).toFixed(2)}%` }}></div>
            </div>
            <p className={styles.stationDetails}>Afstand: {station.distance.toFixed(2)} km</p>
          </li>
        ))}
      </ul>
    </div>
  );
}