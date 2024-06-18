import styles from './Footer.module.scss';
export const Footer = () => {
  return (
    <div className={styles.footer_main_box}>
      {' '}
      <div className={styles.footer_text_box}>
        {' '}
        <span>
          andbudha made this &copy; 2024, watch it, all rights reserved
        </span>
      </div>
    </div>
  );
};
