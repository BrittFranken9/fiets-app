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
                <Image src="/favicon.ico" alt="Logo" width={50} height={50} />
            </div>
            <div className={styles.hamburger} onClick={toggleMenu}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/services">Services</Link>
                <Link href="/contact">Contact</Link>
            </div>
        </nav>
    );
}
