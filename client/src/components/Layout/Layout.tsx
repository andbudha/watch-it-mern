import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Navbar } from '../Navbar/Navbar';
import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.layout_main_box}>
      <div className={styles.navbar_main_box}>
        <Navbar />
      </div>
      <div className={styles.outlet_main_box}>
        <Outlet />
      </div>
      <div className={styles.footer_main_box}>
        <Footer />
      </div>
    </div>
  );
};
