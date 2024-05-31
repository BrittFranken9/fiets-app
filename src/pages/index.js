import Link from 'next/link';
import styles from '@/styles/index.module.css';
import Image from 'next/image';
import ReactLoading from 'react-loading';
import { useState, useEffect } from 'react';

export default function Index() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <ReactLoading type="spin" color="#fd7014" height={100} width={50} />
            </div>
        );
    }

    if (isError) return <div>error</div>;

    return (
        <div className={styles.centerContent}>
            <div className={styles.afbeeldingContainer}>
                <Image src="/huizen.svg" alt="Achtergrond" width={480} height={986} className={styles.afbeelding} />
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.afbeeldingContainer}>
                    <Image src="/Velo-Antwerpen-01.svg" alt="Logo" width={300} height={40} className={styles.logo} />
                </div>

                <p className={styles.text}>Laat je meevoeren door de bruisende energie van Antwerpen terwijl je op de pedalen van een Velo-fiets trapt.</p>

                <Link href="/keuzes">
                    <button className={styles.homeButton}>Find your bike</button>
                </Link>
            </div>
        </div>
    );
}