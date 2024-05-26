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

    const stations = network.stations.filter(station => station.name.toLowerCase().includes(filter.toLowerCase()));

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }

    return (
        <div className={styles.background}>
            <Image src="/Velo-Antwerpen-01.png" alt="Logo" width={200} height={30} className={styles.logo} />
            <h1 className={styles.hoofd}>Zoek hier uw station</h1>
            <div className={styles.inputContainer}>
                <input 
                    type="text" 
                    value={filter} 
                    onChange={handleFilterChange} 
                    className={styles.inputField}
                />
            </div>
            {stations.map(station => (
                <Link 
                    className={styles.customLink} 
                    href={`/stations/${station.id}`} 
                    key={station.id}
                >
                    {station.name}
                </Link>
            ))}
        </div>
    );
}