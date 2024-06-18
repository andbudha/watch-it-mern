import { NavLink } from 'react-router-dom';
import { Movie } from '../../types/common_types';
import styles from './MovieCard.module.scss';
import { BiCameraMovie } from 'react-icons/bi';

type MovieCardProps = {
  movie: Movie;
  movies: Movie[];
};
export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className={styles.movie_card_main_box}>
      <NavLink
        to={`/movies/movie/${movie.id}`}
        className={styles.movies_poster_link_box}
      >
        {movie.thumbnail ? (
          <img
            className={styles.movie_card_img}
            src={movie.thumbnail}
            alt="movie poster"
          />
        ) : (
          <div className={styles.movie_card_img}>
            <div className={styles.camera_icon_box}>
              {' '}
              <BiCameraMovie className={styles.camera_icon} />
            </div>
            <div className={styles.no_poster_title_box}>
              {' '}
              <h4>{movie.title}</h4>
            </div>
          </div>
        )}
      </NavLink>
    </div>
  );
};
