import styles from './Home.module.scss';
import { GridMovies } from './GridMovies/GridMovies';
import { Search } from '../../components/Search/Search';
import { Paginator } from '../../components/Paginator/Paginator';

export const Home = () => {
  return (
    <div className={styles.home_main_box}>
      <Search />
      <GridMovies />
      <Paginator />
    </div>
  );
};
