import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Navbar } from '../Navbar/Navbar';
import styles from './Layout.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import { BurgerMenu } from '../Navbar/BurgerMenu/BurgerMenu';
import { useContext, useEffect } from 'react';

export const Layout = () => {
  const { getUserProfile, fetchAllUsers } = useContext(AuthContext);
  const { fetchMovies } = useContext(DataContext);

  useEffect(() => {
    console.log('use effect is triggered');
    fetchMovies();
    fetchAllUsers();
    getUserProfile();
  }, []);

  return (
    <>
      <div className={styles.layout_main_box}>
        <BurgerMenu />
        <Navbar />
        <div className={styles.outlet_main_box}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
