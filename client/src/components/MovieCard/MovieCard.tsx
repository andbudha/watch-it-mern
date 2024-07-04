import { NavLink } from 'react-router-dom';
import { Movie } from '../../types/common_types';
import styles from './MovieCard.module.scss';
import { BiCameraMovie } from 'react-icons/bi';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';

type MovieCardProps = {
  movie: Movie;
  movies: Movie[];
};
export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className={styles.movie_card_main_box}>
      <NavLink
        to={`/movies/movie/${movie._id}`}
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
      <div className={styles.rating_main_box}>
        <div className={styles.rating_box}>
          <div className={styles.thumb_box}>
            {' '}
            <IoMdThumbsUp className={styles.thumb_icon} />
          </div>
          <div className={styles.total_thumbs_box}>{movie.likes?.length}</div>
        </div>
        <div className={styles.rating_box}>
          <div className={styles.thumb_box}>
            {' '}
            <IoMdThumbsDown className={styles.thumb_icon} />
          </div>
          <div className={styles.total_thumbs_box}>
            {movie.dislikes?.length}
          </div>
        </div>
      </div>
    </div>
  );
};
