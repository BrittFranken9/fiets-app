import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/home">
                    <Image src="/favicon.ico" alt="Logo" width={50} height={50} />
                </Link>
            </div>
            <div className={styles.hamburgerMenuWrapper}>
                <div className={styles.extraLink}>
                    <Link href="/zoeken">
                        <Image src="/zoek.png" alt="Extra Link Photo" width={23} height={21} />
                    </Link>
                </div>
                <div className={`${styles.hamburger} ${menuOpen ? styles.cross : ''}`} onClick={toggleMenu}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
            </div>
            <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
                <Link href="/home" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link href="/about" onClick={() => setMenuOpen(false)}>Over</Link>
                <Link href="/zoeken" onClick={() => setMenuOpen(false)}>Zoeken</Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </div>
        </nav>
    );
}