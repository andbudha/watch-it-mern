import { ChangeEvent, useContext, useState } from 'react';
import styles from './CommentaryForm.module.scss';
import { FiSend } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../../context/DataContext';
import { toastError } from '../../../assets/utils/failedToast';

export const CommentaryForm = () => {
  const { addCommentary, getCommentaries } = useContext(DataContext);
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const { movieID } = useParams();

  const catchTextAreaValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.currentTarget.value);
  };

  const addCommentHandler = () => {
    if (textAreaValue.trim() === '') {
      toastError('Please, first write a commentary!');
    } else if (movieID && textAreaValue.trim() !== '') {
      addCommentary(movieID, textAreaValue.trim());
      getCommentaries();
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
