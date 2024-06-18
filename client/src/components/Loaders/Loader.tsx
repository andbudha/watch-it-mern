import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader_main_box}>
      <span className={styles.loader}></span>
    </div>
  );
};
