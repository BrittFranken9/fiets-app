import Footer from './Creatief/footer';
import styles from '@/styles/Layout.module.css';

export default function Layout2({ children }) {
    return (
        <>
            <div className={styles.container}>
                <main className={styles.main}>{children}</main>
            </div>
            <Footer />
        </>
    );
}