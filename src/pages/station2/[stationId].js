import { useEffect, useRef, useState } from 'react';
import useNetwork from '@/data/network';
import styles from '@/styles/Creatief/StationId.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactLoading from 'react-loading';

export default function StationDetail() {
  const { network, isLoading, isError } = useNetwork();
  const router = useRouter();
  const markerRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Fetching network data and setting up marker
  }, [network, isLoading, isError, router.query.stationId]);

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

  if (isLoading) {
    return (
        <div className={styles.loadingContainer}>
            <ReactLoading type="spin" color="#fd7014" height={100} width={50} />
        </div>
    );
}
  if (isError) return <div>Error</div>;

  if (!router.query.stationId || !network || !userLocation) return (
    <div className={styles.loadingContainer}>
        <ReactLoading type="spin" color="#fd7014" height={100} width={50} />
    </div>
);;

  const station = network.stations.find(station => station.id === router.query.stationId);
  if (!station) return <div>Station not found</div>;

  function removeLeadingDigits(name) {
    return name.replace(/^\d+\s*-\s*/, '');
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const distanceToStation = calculateDistance(userLocation.lat, userLocation.lon, station.latitude, station.longitude);

  return (
    <div>
      
      <span className={styles.titel}>{station.name.replace(/^\d+\s*-\s*/, '')}</span>
      <div className={styles.stationItem}>
        <div className={styles.distanceLine}>
          <div className={styles.distanceDot}></div>
          <div className={styles.distanceLineInner} style={{ width: `${(distanceToStation / 18 * 100).toFixed(2)}%` }}></div>
        </div>
      </div>
      <div className={styles.stationItem2}>
        <p >Afstand tot station: {distanceToStation.toFixed(2)} km</p>
      </div>
      <div className={styles.stationDetail}>
        <div className={styles.infoContainer}>
          <div className={styles.infoBox}>
            <h2 className={styles.infoTitle}>Beschikbare Fietsen</h2>
            <p className={styles.infoCount}>{station.free_bikes}</p>
          </div>
          <div className={styles.infoBox}>
            <h2 className={styles.infoTitle}>Fietsen Weg</h2>
            <p className={styles.infoCount}>{station.empty_slots}</p>
          </div>
        </div>
        <div className={styles.routeContainer}>
          <Link href={`https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`} passHref className={styles.routeLink}>
            Ga
          </Link>
        </div>
      </div>
    </div>
  );
}