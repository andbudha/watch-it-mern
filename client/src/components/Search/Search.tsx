import { ChangeEvent, useContext } from 'react';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import styles from './Search.module.scss';
import { DataContext } from '../../context/DataContext';
import { PaginationContext } from '../../context/PaginationContext';

export const Search = () => {
  const { setSearchInputValue, searchInputValue } = useContext(DataContext);
  const { setCurrentPage } = useContext(PaginationContext);

  const getSearchInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.currentTarget.value);
  };
  const emptySearchInputHandler = () => {
    setSearchInputValue('');
  };

  const setCurrentPageHandler = () => {
    setCurrentPage(1);
  };
  return (
    <div className={styles.search_main_box}>
      <div className={styles.search_box}>
        <div className={styles.search_icon_box}>
          {' '}
          <CiSearch className={styles.search_icon} />
        </div>{' '}
        <input
          value={searchInputValue}
          className={styles.search_input}
          onChange={getSearchInputValueHandler}
          onFocus={setCurrentPageHandler}
        />
        <div className={styles.remove_icon_box}>
          {' '}
          {searchInputValue && (
            <RxCross2
              className={styles.remove_icon}
              onClick={emptySearchInputHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
};
