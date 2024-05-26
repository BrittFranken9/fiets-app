import { useState } from 'react';
import useNetwork from '@/data/network';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';

export default function Home() {
    const [filter, setFilter] = useState('');
    const { network, isLoading, isError } = useNetwork();

    if (isLoading) return <div>loading ...</div>;
    if (isError) return <div>error</div>;

    function getRelevance(station, filter) {
        if (station.name.toLowerCase().startsWith(filter.toLowerCase())) {
            return 1;
        } else if (station.name.toLowerCase().includes(filter.toLowerCase())) {
            return 2;
        }
        return 3;
    }

    const filteredStations = filter
        ? network.stations
            .filter(station => station.name.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => getRelevance(a, filter) - getRelevance(b, filter))
            .slice(0, 5)
        : [];

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Image src="/Velo-Antwerpen-02.png" alt="Logo" width={300} height={50} className={styles.logo} />
                <h1 className={styles.hoofd}>Zoek hier uw station</h1>
                <div className={styles.inputContainer}>
                    <input 
                        type="text" 
                        value={filter} 
                        onChange={handleFilterChange} 
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.results}>
                    {filteredStations.map(station => (
                        <div key={station.id} className={styles.stationContainer}>
                            <Link 
                                className={styles.customLink} 
                                href={`/stations/${station.id}`} 
                            >
                                <div className={styles.stationInfo}>
                                    <span>{station.name}</span>
                                    <span className={`${styles.freeBikes} ${styles.alignRight}`}>
                                        {station.free_bikes}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}