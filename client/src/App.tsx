import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import styles from './App.module.scss';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { MovieDetails } from './pages/MovieDetailsPage/MovieDetails';
import { GridMovies } from './pages/Home/GridMovies/GridMovies';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/Signup/Signup';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { Toaster } from 'react-hot-toast';
import { MyList } from './pages/MyList/MyList';
import { DataProvider } from './context/DataContext';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { AuthProvider } from './context/AuthContext';
import { PaginationProvider } from './context/PaginationContext';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={
          <AuthProvider>
            <DataProvider>
              <PaginationProvider>
                <Layout />
              </PaginationProvider>
            </DataProvider>
          </AuthProvider>
        }
      >
        <Route index element={<Home />} />
        <Route index path="movies" element={<GridMovies />} />
        <Route index path="mylist" element={<MyList />} />
        <Route path="movies/movie/:movieID" element={<MovieDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return (
    <div className={styles.app_main_box}>
      <Toaster />
      <div className={styles.app_box}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
