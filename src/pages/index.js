import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import useNetwork from '@/data/network';
import Link from 'next/link';

export default function Home() {
    const [filter, setFilter] = useState('');
    const { network, isLoading, isError } = useNetwork();

    if (isLoading) return <div>loading ...</div>;
    if (isError) return <div>error</div>;

    const stations = network.stations.filter(station => station.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }

    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }} className={styles.background}>
          <h1>Zoek hier uw station</h1>
          <div className="input-container">
              <input 
                  type="text" 
                  value={filter} 
                  onChange={handleFilterChange} 
                  className="input-field"
              />
          </div>
          {stations.map(station => (
              <Link 
                  className="custom-link" 
                  href={`/stations/${station.id}`} 
                  key={station.id}
                  style={{ display: 'block', marginTop: '10px' }}
              >
                  {station.name}
              </Link>
          ))}
      </div>
  );
}