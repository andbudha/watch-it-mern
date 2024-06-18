import styles from './PageNotFound.module.scss';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';

export const PageNotFound = () => {
  return (
    <div className={styles.page_not_found_main_box}>
      <div className={styles.page_not_found_box}>
        <MdOutlineReportGmailerrorred className={styles.error_icon} />
        <div className={styles.page_not_found_text_box}>
          <span className={styles.page_not_found_status_code}>404</span>
          <span className={styles.page_not_found_text}>Page Not Found</span>
        </div>
      </div>
    </div>
  );
};
