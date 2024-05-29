import { useState, useEffect } from 'react';
import useNetwork from '@/data/network';
import styles from '@/styles/About.module.css';

export default function About() {
  const { network, isLoading, isError } = useNetwork();
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    // Retrieve favorites from local storage when component mounts
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (stationId) => {
    const updatedFavorites = { ...favorites };
    delete updatedFavorites[stationId];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  // Filter favorite stations from network data
  const favoriteStations = network.stations.filter((station) => favorites[station.id]);

  return (
    <div>
      <h1 className={styles.whiteTitle}>Favoriete stations</h1>
      <ul className={styles.stationList}>
        {favoriteStations.map((station) => (
          <li key={station.id} className={styles.stationItem}>
            <div className={styles.stationInfo}>
              <div className={styles.stationHeader}>
                <h2 className={styles.stationName}>{station.name.replace(/^\d+\s*-\s*/, '')}</h2>
                <div className={styles.removeButton} onClick={() => removeFavorite(station.id)}>✖</div>
              </div>
              <div className={styles.stationDetails}>
                <span>Beschikbare fietsen: {station.free_bikes}</span>
                <span>Lege plaatsen: {station.empty_slots}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}