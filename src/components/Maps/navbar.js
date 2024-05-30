import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Maps/Navbar.module.css';

export default function Navbar() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <nav className={`${styles.navbar} ${!visible ? styles.hidden : ''}`}>
            <div className={styles.logo}>
                <Link href="/Maps/home">
                    <Image src="/fiets.svg" alt="Logo" width={40} height={40} />
                </Link>
            </div>
            <div className={styles.veloAntwerpen}>
                <Image src="/Velo-Antwerpen-01.svg" alt="Velo Antwerpen" width={200} height={80} />
            </div>
        </nav>
    );
}