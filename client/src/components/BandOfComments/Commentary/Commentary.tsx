import styles from './Commentary.module.scss';
import { CiUser } from 'react-icons/ci';
import { IoTrash } from 'react-icons/io5';
import { MdDone, MdClear, MdEditNote } from 'react-icons/md';
import { CommentaryType } from '../../../types/common_types';
import { ChangeEvent, useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { DataContext } from '../../../context/DataContext';
import { toastError } from '../../../assets/utils/failedToast';
import { Loader } from '../../Loaders/Loader';

type CommentaryProps = {
  commentary: CommentaryType;
};
export const Commentary = ({ commentary }: CommentaryProps) => {
  const { user, allUsers } = useContext(AuthContext);
  const { deleteCommentary, editCommentary, loaderStatus } =
    useContext(DataContext);

  const filteredUser = allUsers?.find((user) => user._id === commentary.userID);

  const [editCommentaryTextareaValue, setEditCommentaryTextareaValue] =
    useState<string>(commentary.commentary);
  const date = new Date(commentary.createdAt!).toLocaleDateString();
  const time = new Date(commentary.createdAt!).toLocaleTimeString();
  const [showEditBox, setShowEditBox] = useState<boolean>(false);
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
    if (editCommentaryTextareaValue.trim() === '') {
      toastError('First write a commentary before posting!');
    } else {
      editCommentary(
        movieID,
        commentaryID,
        editCommentaryTextareaValue,
        setShowEditBox
      );
      setShowEditBox(false);
    }
  };
  const discardCommentaryChangesHandler = () => {
    setEditCommentaryTextareaValue(commentary.commentary);
    setShowEditBox(false);
  };
  const deleteCommentaryHandler = (commentaryID: string, movieID: string) => {
    deleteCommentary(movieID, commentaryID);
  };

  return (
    <div className={styles.commentary_main_box}>
      {commentary.userID === user?.userID &&
        loaderStatus === 'postNewStatus' && <Loader />}

      <div
        className={
          commentary.userID === user?.userID
            ? styles.loggedin_user_commentary_content_box
            : styles.commentary_content_box
        }
      >
        <div className={styles.user_box}>
          {commentary.userID === user?.userID ? (
            <>
              <div className={styles.user_img_box}>
                {filteredUser?.avatar ? (
                  <img
                    src={filteredUser.avatar}
                    alt="user avatar"
                    className={styles.user_icon}
                  />
                ) : (
                  <CiUser className={styles.user_icon} />
                )}
              </div>
              <h5 className={styles.user_name}>{filteredUser?.nickName}</h5>
            </>
          ) : (
            <>
              <h5 className={styles.user_name}>{filteredUser?.nickName}</h5>
              <div className={styles.user_img_box}>
                {filteredUser?.avatar ? (
                  <img
                    src={filteredUser.avatar}
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
              <p>
                {time}, {date}
              </p>
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
                onClick={discardCommentaryChangesHandler}
              />
            </div>
          </div>
        )}

        {commentary.userID === user?.userID && !showEditBox && (
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
