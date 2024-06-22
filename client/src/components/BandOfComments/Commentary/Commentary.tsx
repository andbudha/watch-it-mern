import { CiUser, CiEdit, CiTrash } from 'react-icons/ci';
import styles from './Commentary.module.scss';
import { CommentaryType } from '../../../types/common_types';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

type CommentaryProps = {
  commentary: CommentaryType;
};
export const Commentary = ({ commentary }: CommentaryProps) => {
  const { user } = useContext(AuthContext);
  const timeStamp = new Date(commentary.timestamp).toLocaleString();

  const editCommentaryHandler = () => {
    console.log('Ready to edit your commentary!');
  };

  const deleteCommentaryHandler = (commentaryID: string) => {
    console.log('Ready to delete your commentary!', commentaryID);
  };
  return (
    <div className={styles.commentary_main_box}>
      <div
        className={
          commentary.userID === user!._id
            ? styles.loggedin_user_commentary_content_box
            : styles.commentary_content_box
        }
      >
        <div className={styles.user_box}>
          {commentary.userID === user!._id ? (
            <>
              <div className={styles.user_img_box}>
                {commentary.avatar ? (
                  <img
                    src={commentary.avatar}
                    alt=""
                    className={styles.user_icon}
                  />
                ) : (
                  <CiUser className={styles.user_icon} />
                )}
              </div>
              <h5 className={styles.user_name}>{commentary.nickName}</h5>
            </>
          ) : (
            <>
              <h5 className={styles.user_name}>{commentary.nickName}</h5>
              <div className={styles.user_img_box}>
                {commentary.avatar ? (
                  <img
                    src={commentary.avatar}
                    alt=""
                    className={styles.user_icon}
                  />
                ) : (
                  <CiUser className={styles.user_icon} />
                )}
              </div>
            </>
          )}
        </div>
        <div className={styles.commentary_text_box}>
          <p className={styles.commentary_text}>{commentary.commentary}</p>
        </div>
        <div className={styles.commentary_timestamp_box}>
          <p>{timeStamp}</p>
        </div>
        {commentary.userID === user!._id && (
          <div className={styles.commentary_button_box}>
            <CiEdit
              className={styles.edit_icon}
              onClick={editCommentaryHandler}
            />
            <CiTrash
              className={styles.remove_icon}
              onClick={() => deleteCommentaryHandler(commentary.commentaryID)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
