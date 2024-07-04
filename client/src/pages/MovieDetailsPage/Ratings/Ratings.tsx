import { IoMdThumbsDown, IoMdThumbsUp } from 'react-icons/io';
import styles from './Ratings.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { DataContext } from '../../../context/DataContext';
import { toastError } from '../../../assets/utils/failedToast';

type RatingsPropType = {
  movieID: string | undefined;
};
export const Ratings = ({ movieID }: RatingsPropType) => {
  const { user } = useContext(AuthContext);
  const { addLike, undoAddLike, addDislike, undoAddDislike, likes, dislikes } =
    useContext(DataContext);

  const existingUserInLikesCollection = likes?.filter(
    (id) => id === user?.userID
  ).length;
  const existingUserInDislikesCollection = dislikes?.filter(
    (id) => id === user?.userID
  ).length;

  const addLikeHandler = () => {
    if (user === null) {
      toastError('You must be logged in to be able to rate movies!');
    } else if (!existingUserInLikesCollection && user && movieID) {
      undoAddDislike(movieID, user?.userID);
      addLike(movieID, user?.userID);
    } else if (existingUserInLikesCollection && user && movieID) {
      undoAddLike(movieID, user?.userID);
    }
  };

  const addDislikeHandler = () => {
    if (user === null) {
      toastError('You must be logged in to be able to rate movies!');
    } else if (!existingUserInDislikesCollection && user && movieID) {
      undoAddLike(movieID, user?.userID);
      addDislike(movieID, user?.userID);
    } else if (existingUserInDislikesCollection && user && movieID) {
      undoAddDislike(movieID, user?.userID);
    }
  };
  return (
    <div className={styles.rating_main_box}>
      <div className={styles.rating_box}>
        <div className={styles.thumb_box}>
          {' '}
          <IoMdThumbsUp
            className={`${styles.thumb_icon} ${
              existingUserInLikesCollection && styles.thumbs_up
            }`}
            onClick={addLikeHandler}
          />
        </div>
        <div className={styles.total_thumbs_box}>{likes?.length}</div>
      </div>
      <div className={styles.rating_box}>
        <div className={styles.thumb_box}>
          {' '}
          <IoMdThumbsDown
            className={`${styles.thumb_icon} ${
              existingUserInDislikesCollection && styles.thumbs_down
            }`}
            onClick={addDislikeHandler}
          />
        </div>
        <div className={styles.total_thumbs_box}>{dislikes?.length}</div>
      </div>
    </div>
  );
};
