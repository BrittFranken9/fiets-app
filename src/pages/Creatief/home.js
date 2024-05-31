import { useState, useEffect } from 'react';
import useNetwork from '@/data/network';
import styles from '@/styles/Creatief/Home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ReactLoading from 'react-loading';

export default function Home() {
  const { network, isLoading, isError } = useNetwork();
  const router = useRouter();

  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(storedFavorites);
  }, []);

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
        {network && network.stations && network.stations.map((station) => (
          <div key={station.id} className={styles.stationContainer}>
            <div className={styles.stationDetails}>
              <div className={styles.stationName}>
                <a href={`/station2/${station.id}`} className={styles.stationLink}>
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
  );
}