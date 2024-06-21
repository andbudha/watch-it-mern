import { NavLink, Navigate } from 'react-router-dom';
import styles from './MyList.module.scss';
import { AiFillDelete } from 'react-icons/ai';
import { IoChevronBack } from 'react-icons/io5';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import { MiniLoader } from '../../components/Loaders/MiniLoader';
import { BiCameraMovie } from 'react-icons/bi';
export const MyList = () => {
  const { user, isLoading } = useContext(AuthContext);
  const { myMovieList, getUsers, fetchMyMovieList } = useContext(DataContext);

  useEffect(() => {
    getUsers();
    fetchMyMovieList(user!._id);
  }, []);
  if (!user) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={styles.mylist_main_box}>
      <div className={styles.mylist_box}>
        {!!myMovieList?.length && (
          <h2 className={styles.my_list_title}>Movies to watch:</h2>
        )}
        {myMovieList?.length ? (
          myMovieList.map((movie) => {
            return (
              <div className={styles.list_item_box} key={movie._id}>
                {movie?.thumbnail ? (
                  <div className={styles.list_item_img_box}>
                    <img
                      className={styles.list_item_img}
                      src={movie.thumbnail}
                      alt="movie poster"
                    />
                  </div>
                ) : (
                  <div className={styles.movie_card_img}>
                    <div className={styles.camera_icon_box}>
                      {' '}
                      <BiCameraMovie className={styles.camera_icon} />
                    </div>
                  </div>
                )}
                <div className={styles.list_item_detail_box}>
                  <h4 className={styles.list_item_title}>
                    <div>Title:</div>{' '}
                    <div className={styles.title}>{movie.title}</div>
                  </h4>
                  <h4 className={styles.list_item_year}>
                    <div>Year:</div>
                    <div className={styles.year}>{movie.year}</div>
                  </h4>
                </div>
                <div className={styles.list_item_icon_box}>
                  {isLoading && <MiniLoader />}
                  <AiFillDelete
                    className={styles.list_item_icon}
                    // onClick={() => removeMovieHandler(movie)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.mylist_info_box}>
            {' '}
            <h1>List</h1>
            <h1>Currently Empty</h1>
            <h2>Add Movies To Your List</h2>
            <NavLink className={styles.grid_movies_button} to={'/'}>
              {' '}
              <IoChevronBack className={styles.chevron_icon} />
              main
            </NavLink>
          </div>
        )}
        {!!myMovieList?.length && (
          <div className={styles.total_amount_box}>
            <h4>Total:</h4>
            <span className={styles.total_amount}>{myMovieList?.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};
