import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';

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
                <Link href="/home">
                    <Image src="/fiets.svg" alt="Logo" width={50} height={50} />
                </Link>
            </div>
            <div className={styles.extraLink}>
                <Link href="/zoeken">
                    <Image src="/zoek.png" alt="Extra Link Photo" width={23} height={21} />
                </Link>
            </div>
        </nav>
    );
}