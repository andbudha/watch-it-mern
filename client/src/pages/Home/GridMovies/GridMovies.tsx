import { MovieCard } from '../../../components/MovieCard/MovieCard';
import styles from './GridMovies.module.scss';
import { useContext } from 'react';
import { PaginationContext } from '../../../context/PaginationContext';
import { FaRegFaceSadTear } from 'react-icons/fa6';

export const GridMovies = () => {
  const { moviesToDisplayPerPage } = useContext(PaginationContext);

  const movieList = moviesToDisplayPerPage?.map((movie) => {
    return (
      <div key={movie.id}>
        <MovieCard movie={movie} movies={moviesToDisplayPerPage} />
      </div>
    );
  });
  return (
    <div className={styles.movies_main_box}>
      {moviesToDisplayPerPage?.length ? (
        <div className={styles.movies_box}>{movieList}</div>
      ) : (
        <div className={styles.no_match_found_box}>
          {' '}
          <FaRegFaceSadTear className={styles.no_match_found_icon} />
          <div className={styles.no_match_found_text}>No Data Found</div>
        </div>
      )}
    </div>
  );
};
