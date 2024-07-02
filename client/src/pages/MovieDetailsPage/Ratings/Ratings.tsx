import { IoMdThumbsDown, IoMdThumbsUp } from 'react-icons/io';
import styles from './Ratings.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

export const Ratings = () => {
  const { user } = useContext(AuthContext);
  const addLikeHandler = () => {
    if (user) console.log('Like added:::', user?.userID);
  };

  const removeLikeHandler = () => {
    if (user) console.log('Like removed:::', user?.userID);
  };
  return (
    <div className={styles.rating_main_box}>
      <div className={styles.rating_box}>
        <div className={styles.thumb_box}>
          {' '}
          <IoMdThumbsUp
            className={styles.thumb_icon}
            onClick={addLikeHandler}
          />
        </div>
        <div className={styles.total_thumbs_box}>9</div>
      </div>
      <div className={styles.rating_box}>
        <div className={styles.thumb_box}>
          {' '}
          <IoMdThumbsDown
            className={styles.thumb_icon}
            onClick={removeLikeHandler}
          />
        </div>
        <div className={styles.total_thumbs_box}>2</div>
      </div>
    </div>
  );
};
