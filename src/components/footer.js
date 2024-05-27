import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.footerLocatie}>Locaties</p>
        <Image src="/Velo-Antwerpen-01.png" alt="Logo" width={300} height={50} className={styles.logo}/>
      </div>
      <div className={styles.footerContent}>
        <p>© {new Date().getFullYear()} Velo Antwerpen  -</p>
        <Link href="https://www.BRITTvisualdesign.be" className={styles.footerLink}>
          BRITTvisualdesign
        </Link>
      </div>
    </footer>
  );
}