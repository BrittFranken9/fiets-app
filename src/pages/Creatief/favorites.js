import { useState, useEffect } from 'react';
import useNetwork from '@/data/network';
import styles from '@/styles/Creatief/favorites.module.css';
import Link from 'next/link';
import ReactLoading from 'react-loading';

export default function About() {
  const { network, isLoading, isError } = useNetwork();
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (stationId) => {
    const updatedFavorites = { ...favorites };
    delete updatedFavorites[stationId];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (isLoading) {
    return (
        <div className={styles.loadingContainer}>
            <ReactLoading type="spin" color="#fd7014" height={100} width={50} />
        </div>
    );
}
  if (isError) return <div>Error</div>;

  const favoriteStations = network.stations.filter((station) => favorites[station.id]);

  return (
    <div>
      <h1 className={styles.whiteTitle}>Favoriete stations</h1>
      <ul className={styles.stationList}>
        {favoriteStations.map((station) => (
          <li key={station.id} className={styles.stationItem}>
            <div className={styles.stationInfo}>
              <div className={styles.stationHeader}>
                <Link href={`/station2/${station.id}`} className={styles.stationName}>
                  {station.name.replace(/^\d+\s*-\s*/, '')}
                </Link>
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