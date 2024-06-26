import { ChangeEvent, useContext, useState } from 'react';
import styles from './CommentaryForm.module.scss';
import { FiSend } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../../context/DataContext';
import { toastError } from '../../../assets/utils/failedToast';
import { v4 } from 'uuid';
import { AuthContext } from '../../../context/AuthContext';

export const CommentaryForm = () => {
  const { addCommentary } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const { movieID } = useParams();

  const catchTextAreaValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.currentTarget.value);
  };

  const addCommentHandler = () => {
    const newCommentary = {
      commentaryID: v4(),
      movieID: movieID!,
      userID: user!._id,
      avatar:
        'https://d8i23n05v6d5f.cloudfront.net/episodes/1700387326neIwHZ.png',
      nickName: user!.nickName,
      timestamp: new Date().getTime(),
      commentary: textAreaValue.trim(),
    };
    if (textAreaValue.trim() === '') {
      toastError('Please, first write a commentary!');
    } else if (movieID && textAreaValue.trim() !== '') {
      addCommentary(movieID, newCommentary);
    }
    setTextAreaValue('');
  };
  return (
    <div className={styles.commentary_main_box}>
      <div className={styles.common_box}>
        {' '}
        <div className={styles.text_area_box}>
          <textarea
            value={textAreaValue}
            className={styles.text_area}
            onChange={catchTextAreaValueHandler}
            placeholder={'Type in your commentary here...'}
          ></textarea>
        </div>
        <div
          className={styles.submit_commentary_button_box}
          onClick={addCommentHandler}
        >
          <div className={styles.submit_commentary_button}>
            {' '}
            <FiSend className={styles.send_icon} />
          </div>
        </div>
      </div>
    </div>
  );
};
