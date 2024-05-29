import { useState } from 'react';
import useNetwork from '@/data/network';
import Link from 'next/link';
import styles from '@/styles/zoeken.module.css';
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

    function removeLeadingDigits(name) {
        return name.replace(/^\d+\s*-\s*/, '');
    }

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }

    const popularStations = network.stations.slice(0, 8);

    const showSuggestions = filter === '';

    const filteredStations = filter
        ? network.stations
            .filter(station => station.name.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => getRelevance(a, filter) - getRelevance(b, filter))
            .slice(0, 10)
        : [];

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <div className={styles.searchBox}>
                    <Image src="/search.svg" alt="Search Icon" className={styles.searchIcon} width={40} height={40}/>
                    <input 
                        type="text" 
                        value={filter} 
                        onChange={handleFilterChange} 
                        className={styles.inputField}
                        placeholder="..."
                    />
                </div>
            </div>
            {showSuggestions && (
                <div className={styles.resultsContainer}>
                    <div className={styles.results}>
                        <div className={styles.stationContainer}>
                            <div className={styles.stationInfo}>
                                <span className={styles.suggesties}>Suggesties</span>
                            </div>
                        </div>
                        {popularStations.map(station => (
                            <div key={station.id} className={styles.stationContainer}>
                                <Link 
                                    className={styles.customLink} 
                                    href={`/stations/${station.id}`} 
                                >
                                    <div className={styles.stationInfo}>
                                        <span>{removeLeadingDigits(station.name)}</span>
                                        <span className={`${styles.freeBikes} ${styles.alignRight}`}>
                                            {station.free_bikes}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {!showSuggestions && (
                <div className={styles.resultsContainer}>
                    <div className={styles.results}>
                        {filteredStations.map(station => (
                            <div key={station.id} className={styles.stationContainer}>
                                <Link 
                                    className={styles.customLink} 
                                    href={`/stations/${station.id}`} 
                                >
                                    <div className={styles.stationInfo}>
                                        <span>{removeLeadingDigits(station.name)}</span>
                                        <span className={`${styles.freeBikes} ${styles.alignRight}`}>
                                            {station.free_bikes}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}