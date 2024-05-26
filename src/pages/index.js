import { useState } from 'react';
import useNetwork from '@/data/network';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

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
        <div className="background">
            <h1 className="Hoofd">Zoek hier uw station</h1>
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
                >
                    {station.name}
                </Link>
            ))}
        </div>
    );
}