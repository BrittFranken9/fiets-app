import { useState } from 'react';
import styles from '@/styles/footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link href="/home" passHref className={`${styles.footerLink} ${activeIcon === 'home' && styles.active}`} onClick={() => handleIconClick('home')}>
          <Image src="/home.svg" alt="Home" className={styles.footerIcon} width={300} height={40}/>
        </Link>
        <Link href="/zoeken" passHref className={`${styles.footerLink} ${activeIcon === 'search' && styles.active}`} onClick={() => handleIconClick('search')}>
          <Image src="/search.svg" alt="Search" className={styles.footerIcon} width={300} height={40}/>
        </Link>
        <Link href="/favorites" passHref className={`${styles.footerLink} ${activeIcon === 'favorites' && styles.active}`} onClick={() => handleIconClick('favorites')}>
          <Image src="/favorites.svg" alt="Favorites" className={styles.footerIcon} width={300} height={40}/>
        </Link>
        <Link href="/map" passHref className={`${styles.footerLink} ${activeIcon === 'map' && styles.active}`} onClick={() => handleIconClick('map')}>
          <Image src="/map.svg" alt="Map" className={styles.footerIconMap} width={300} height={40}/>
        </Link>
      </div>
    </footer>
  );
}