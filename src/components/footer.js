import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p>Locaties</p>
        <Image src="/Velo-Antwerpen-01.png" alt="Logo" width={300} height={50}/>
      </div>
      <p>© {new Date().getFullYear()} Company Name</p>
      <p>
        <Link href="https://www.BRITTvisualdesign.be">
          BRITTvisualdesign
        </Link>
      </p>
    </footer>
  );
}