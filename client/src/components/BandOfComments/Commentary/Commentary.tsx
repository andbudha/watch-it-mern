import styles from './Commentary.module.scss';
import { CiUser } from 'react-icons/ci';
import { IoTrash } from 'react-icons/io5';
import { MdDone, MdClear, MdEditNote } from 'react-icons/md';
import { CommentaryType } from '../../../types/common_types';
import { ChangeEvent, useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { DataContext } from '../../../context/DataContext';

type CommentaryProps = {
  commentary: CommentaryType;
};
export const Commentary = ({ commentary }: CommentaryProps) => {
  const { user } = useContext(AuthContext);
  const { deleteCommentary, editCommentary } = useContext(DataContext);
  const [showEditBox, setShowEditBox] = useState<boolean>(true);
  const [editCommentaryTextareaValue, setEditCommentaryTextareaValue] =
    useState<string>(commentary.commentary);
  const timeStamp = new Date(commentary.timestamp).toLocaleString();

  const showEditBoxHandler = () => {
    setShowEditBox(true);
  };

  const catchEditCommentaryTextareaValueHandler = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditCommentaryTextareaValue(e.currentTarget.value);
  };
  const saveCommentaryChangesHandler = (
    movieID: string,
    commentaryID: string
  ) => {
    console.log('Commentary saved:', editCommentaryTextareaValue);
    editCommentary(movieID, commentaryID, editCommentaryTextareaValue);
    setShowEditBox(false);
  };
  const closeEditCommentaryBoxHandler = () => {
    setEditCommentaryTextareaValue(commentary.commentary);
    setShowEditBox(false);
  };
  const deleteCommentaryHandler = (commentaryID: string, movieID: string) => {
    deleteCommentary(movieID, commentaryID);
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
        {!showEditBox ? (
          <>
            {' '}
            <div className={styles.commentary_text_box}>
              <p className={styles.commentary_text}>{commentary.commentary}</p>
            </div>
            <div className={styles.commentary_timestamp_box}>
              <p>{timeStamp}</p>
            </div>
          </>
        ) : (
          <div className={styles.edit_commentary_text_box}>
            <textarea
              value={editCommentaryTextareaValue}
              className={styles.textarea_box}
              onChange={catchEditCommentaryTextareaValueHandler}
            ></textarea>

            <div className={styles.edit_commentary_button_box}>
              <MdDone
                className={styles.save_commentary_icon}
                onClick={() =>
                  saveCommentaryChangesHandler(
                    commentary.movieID,
                    commentary.commentaryID
                  )
                }
              />
              <MdClear
                className={styles.close_edit_commentary_box_icon}
                onClick={closeEditCommentaryBoxHandler}
              />
            </div>
          </div>
        )}

        {commentary.userID === user!._id && !showEditBox && (
          <div className={styles.commentary_button_box}>
            <MdEditNote
              className={styles.edit_icon}
              onClick={showEditBoxHandler}
            />
            <IoTrash
              className={styles.remove_icon}
              onClick={() =>
                deleteCommentaryHandler(
                  commentary.commentaryID,
                  commentary.movieID
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
