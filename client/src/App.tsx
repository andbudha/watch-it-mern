import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { MovieDetails } from './pages/MovieDetailsPage/MovieDetails';
import { GridMovies } from './pages/Home/GridMovies/GridMovies';
import { useContext, useEffect } from 'react';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/Signup/Signup';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { Toaster } from 'react-hot-toast';
import { MyList } from './pages/MyList/MyList';
import { DataContext } from './context/DataContext';
import { BurgerMenu } from './components/Navbar/BurgerMenu/BurgerMenu';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { AuthContext } from './context/AuthContext';

function App() {
  const { getUserProfile, fetchAllUsers } = useContext(AuthContext);
  const { fetchMovies } = useContext(DataContext);

  useEffect(() => {
    fetchMovies();
    fetchAllUsers();
    getUserProfile();
  }, []);

  return (
    <div className={styles.app_main_box}>
      <Toaster />
      <div className={styles.app_box}>
        <BurgerMenu />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route index path="movies" element={<GridMovies />} />
            <Route index path="mylist" element={<MyList />} />
            <Route path="movies/movie/:movieID" element={<MovieDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
