import Navbar from './Creatief/navbar';
import Footer from './Creatief/footer';
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