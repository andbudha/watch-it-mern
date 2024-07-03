import { IoMdThumbsDown, IoMdThumbsUp } from 'react-icons/io';
import styles from './Ratings.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { DataContext } from '../../../context/DataContext';
import { successfulToast } from '../../../assets/utils/successfulToast';

type RatingsPropType = {
  movieID: string | undefined;
};
export const Ratings = ({ movieID }: RatingsPropType) => {
  const { user } = useContext(AuthContext);
  const { addLike, undoAddLike, addDislike, likes, dislikes } =
    useContext(DataContext);

  const addLikeHandler = () => {
    const existingUserInLikesCollection = likes?.filter(
      (id) => id === user?.userID
    ).length;
    console.log('Existing user id:', existingUserInLikesCollection);

    if (!existingUserInLikesCollection && user && movieID) {
      addLike(movieID, user?.userID);
    } else if (existingUserInLikesCollection && user && movieID) {
      undoAddLike(movieID, user?.userID);
    }
  };

  const addDislikeHandler = () => {
    const existingUserInDislikesCollection = dislikes?.filter(
      (id) => id === user?.userID
    ).length;
    console.log('Existing user id:', existingUserInDislikesCollection);
    if (!existingUserInDislikesCollection && user && movieID) {
      undoAddLike(movieID, user?.userID);
      addDislike(movieID, user?.userID);
    } else if (!existingUserInDislikesCollection && user && movieID) {
      addDislike(movieID, user?.userID);
    } else {
      successfulToast('You have already rated this movie!');
    }
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
        <div className={styles.total_thumbs_box}>{likes?.length}</div>
      </div>
      <div className={styles.rating_box}>
        <div className={styles.thumb_box}>
          {' '}
          <IoMdThumbsDown
            className={styles.thumb_icon}
            onClick={addDislikeHandler}
          />
        </div>
        <div className={styles.total_thumbs_box}>{dislikes?.length}</div>
      </div>
    </div>
  );
};
