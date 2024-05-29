import { useState, useEffect } from 'react';
import styles from '@/styles/footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    const savedIcon = localStorage.getItem('activeIcon');
    if (savedIcon) {
      setActiveIcon(savedIcon);
    }
  }, []);

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
    localStorage.setItem('activeIcon', iconName);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link href="/home" passHref className={`${styles.footerLink} ${activeIcon === 'home' && styles.active}`} onClick={() => handleIconClick('home')}>
          <Image src={activeIcon === 'home' ? "/home-active.svg" : "/home.svg"} alt="Home" className={styles.footerIcon} width={300} height={40}/>
        </Link>
        <Link href="/zoeken" passHref className={`${styles.footerLink} ${activeIcon === 'zoeken' && styles.active}`} onClick={() => handleIconClick('zoeken')}>
          <Image src={activeIcon === 'zoeken' ? "/search-active.svg" : "/search.svg"} alt="Zoeken" className={styles.footerIcon} width={300} height={40}/>
        </Link>
        <Link href="/favorites" passHref className={`${styles.footerLink} ${activeIcon === 'favorites' && styles.active}`} onClick={() => handleIconClick('favorites')}>
          <Image src={activeIcon === 'favorites' ? "/favorites-orange.svg" : "/favorites.svg"} alt="Favorites" className={styles.footerIcon} width={300} height={40}/>
        </Link>
        <Link href="/map" passHref className={`${styles.footerLink} ${activeIcon === 'map' && styles.active}`} onClick={() => handleIconClick('map')}>
          <Image src={activeIcon === 'map' ? "/map-active.svg" : "/map.svg"} alt="Map" className={styles.footerIconMap} width={300} height={40}/>
        </Link>
      </div>
    </footer>
  );
}