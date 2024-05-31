import Link from 'next/link';
import styles from '@/styles/keuzes.module.css';
import Image from 'next/image';
import ReactLoading from 'react-loading';

export default function Index() {

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

                <p className={styles.text}>Kies hoe u uw fiets wilt gaan vinden in Antwerpen.</p>

                <Link href="/Maps/home">
                    <button className={styles.homeButton}>Maps</button>
                </Link>
                <Link href="/Creatief/home">
                    <button className={styles.homeButton}>Creatief</button>
                </Link>
            </div>
        </div>
    );
}