import Navbar from './Maps/navbar';
import Footer from './Maps/footer';
import styles from '@/styles/Layout.module.css';

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <main className={styles.main}>{children}</main>
            </div>
            <Footer />
        </>
    );
}