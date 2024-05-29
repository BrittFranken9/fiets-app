import { useState, useEffect } from 'react';
import useNetwork from '@/data/network';

export default function About() {
  const { network, isLoading, isError } = useNetwork();
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    // Retrieve favorites from local storage when component mounts
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(storedFavorites);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  // Filter favorite stations from network data
  const favoriteStations = network.stations.filter((station) => favorites[station.id]);

  return (
    <div>
      <h1>About {network.name}</h1>
      <h2>Favorite Stations</h2>
      <ul>
        {favoriteStations.map((station) => (
          <li key={station.id}>{station.name}</li>
        ))}
      </ul>
    </div>
  );
}