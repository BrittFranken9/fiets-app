import Link from 'next/link';
import styles from '@/styles/index.module.css';
import Image from 'next/image';

export default function Index() {
    return (
        <div className={styles.centerContent}>
            <Image src="/public/Achtergrond-Index.png" alt="Voorbeeld" className={styles.afbeelding} width={100} height={100} />
            <Link href="/home">
                <button className={styles.homeButton}>Go to Home</button>
            </Link>
        </div>
    );
}