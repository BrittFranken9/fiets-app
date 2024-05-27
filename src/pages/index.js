import Link from 'next/link';
import styles from '@/styles/index.module.css';
import Image from 'next/image';

export default function Index() {
    return (
        <div className={styles.centerContent}>
            <div className={styles.afbeeldingContainer}>
                <Image src="/Achtergrond-Index.png" alt="Achtergrond" width={500} height={1000} className={styles.afbeelding} />
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.afbeeldingContainer}>
                    <Image src="/Velo-Antwerpen-01.png" alt="Logo" width={300} height={40} className={styles.logo} />
                </div>

                <p className={styles.text}>Welkom bij Velo, waar fietsen een avontuur wordt en mobiliteit een belevenis.</p>

                <Link href="/home">
                    <button className={styles.homeButton}>Find your bike</button>
                </Link>
            </div>
        </div>
    );
}