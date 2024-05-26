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
                <Link href="/">
                  <Image src="/Velo-Antwerpen-01.png" alt="Logo" width={170} height={0} />
                </Link>
            </div>
            <div className={`${styles.hamburger} ${menuOpen ? styles.cross : ''}`} onClick={toggleMenu}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
                <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
                <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </div>
        </nav>
    );
}