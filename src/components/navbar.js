import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/" onClick={closeMenu}>
                  <Image src="/favicon.ico" alt="Logo" width={50} height={50} />
                </Link>
            </div>
            <div className={styles.hamburger} onClick={toggleMenu}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
                <Link href="/" onClick={closeMenu}>Home</Link>
                <Link href="/about" onClick={closeMenu}>About</Link>
                <Link href="/services" onClick={closeMenu}>Services</Link>
                <Link href="/contact" onClick={closeMenu}>Contact</Link>
            </div>
        </nav>
    );
}