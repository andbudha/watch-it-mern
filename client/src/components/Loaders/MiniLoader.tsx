import styles from './MiniLoader.module.scss';

export const MiniLoader = () => {
  return (
    <div className={styles.loader_main_box}>
      <span className={styles.loader}></span>
    </div>
  );
};
