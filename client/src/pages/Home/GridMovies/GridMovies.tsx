import { MovieCard } from '../../../components/MovieCard/MovieCard';
import styles from './GridMovies.module.scss';
import { useContext } from 'react';
import { PaginationContext } from '../../../context/PaginationContext';
import { FaRegFaceSadTear } from 'react-icons/fa6';
import { Loader } from '../../../components/Loaders/Loader';
import { DataContext } from '../../../context/DataContext';

export const GridMovies = () => {
  const { moviesToDisplayPerPage } = useContext(PaginationContext);
  const { loaderStatus } = useContext(DataContext);
  const movieList = moviesToDisplayPerPage?.map((movie) => {
    return (
      <div key={movie._id}>
        <MovieCard movie={movie} movies={moviesToDisplayPerPage} />
      </div>
    );
  });

  return (
    <div className={styles.movies_main_box}>
      {loaderStatus === 'loading' ||
      (loaderStatus === 'idle' && !moviesToDisplayPerPage) ? (
        <Loader />
      ) : (
        <div className={styles.movies_box}>
          {loaderStatus === 'idle' && moviesToDisplayPerPage!.length > 0 ? (
            movieList
          ) : (
            <div className={styles.no_match_found_box}>
              {' '}
              <FaRegFaceSadTear className={styles.no_match_found_icon} />
              <div className={styles.no_match_found_text}>No Data Found</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
