import { CiUser } from 'react-icons/ci';
import styles from './Commentary.module.scss';
import { CommentaryType } from '../../../types/common_types';

type CommentaryProps = {
  commentary: CommentaryType;
};
export const Commentary = ({ commentary }: CommentaryProps) => {
  const convertedTime = commentary.timestamp.toDate().toLocaleTimeString();
  const convertedDate = commentary.timestamp.toDate().toDateString();

  return (
    <div className={styles.commentary_main_box}>
      <div className={styles.commentary_content_box}>
        <div className={styles.user_box}>
          <div className={styles.user_img_box}>
            <CiUser className={styles.user_icon} />
          </div>
          <h5 className={styles.user_name}>{commentary.email}</h5>
        </div>
        <div className={styles.commentary_text_box}>
          <p className={styles.commentary_text}>{commentary.commentary}</p>
        </div>
        <div className={styles.commentary_timestamp_box}>
          <p>{convertedTime}</p>
          <p>{convertedDate}</p>
        </div>
      </div>
    </div>
  );
};
