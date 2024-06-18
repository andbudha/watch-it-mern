import { useContext, useEffect, useState } from 'react';
import styles from './BurgerMenu.module.scss';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import { CiHome, CiLogin, CiLogout, CiUser, CiViewList } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { DataContext } from '../../../context/DataContext';

export const BurgerMenu = () => {
  const { logOutUser, user } = useContext(AuthContext);
  const { getUsers, usersCollection } = useContext(DataContext);
  const [display, setDisplay] = useState<boolean>(false);
  const currentUserList = usersCollection?.find(
    (collectionUser) => collectionUser.id === user?.userID
  )?.movieList;
  useEffect(() => {
    getUsers();
  }, []);
  const logOutHandler = () => {
    logOutUser();
    setDisplay(!display);
  };
  const toggleDisplayHandler = () => {
    setDisplay(!display);
  };
  return (
    <div className={styles.burger_menu_main_box}>
      <div
        className={
          display
            ? styles.dropped_burger_menu_box
            : styles.hidden_burger_menu_box
        }
      >
        {!user ? (
          <div className={styles.auth_box}>
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                isActive ? styles.active : styles.burger_menu_button_box
              }
              onClick={toggleDisplayHandler}
            >
              <span className={styles.link_text}>main</span>
              <CiHome className={styles.burger_menu_icon} />
            </NavLink>
            <NavLink
              to={'login'}
              className={({ isActive }) =>
                isActive ? styles.active : styles.burger_menu_button_box
              }
              onClick={toggleDisplayHandler}
            >
              <span className={styles.link_text}>login</span>
              <CiLogin className={styles.burger_menu_icon} />
            </NavLink>
            <NavLink
              to={'signup'}
              className={({ isActive }) =>
                isActive ? styles.active : styles.burger_menu_button_box
              }
              onClick={toggleDisplayHandler}
            >
              <span className={styles.link_text}>signup</span>
              <CiUser className={styles.burger_menu_icon} />
            </NavLink>
          </div>
        ) : (
          <div className={styles.nav_box}>
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                isActive ? styles.active : styles.burger_menu_button_box
              }
              onClick={toggleDisplayHandler}
            >
              <span className={styles.link_text}>main</span>
              <CiHome className={styles.burger_menu_icon} />
            </NavLink>
            <NavLink
              to={'mylist'}
              className={({ isActive }) =>
                isActive ? styles.active : styles.burger_menu_button_box
              }
              onClick={toggleDisplayHandler}
            >
              {' '}
              <span className={styles.link_text}>my list</span>
              {currentUserList?.length ? (
                <div className={styles.number_of_items_in_mylist_box}>
                  {' '}
                  <span className={styles.my_list_length}>
                    {currentUserList.length}
                  </span>
                </div>
              ) : (
                <CiViewList className={styles.burger_menu_icon} />
              )}
            </NavLink>
            <div
              className={styles.burger_menu_button_box}
              onClick={logOutHandler}
            >
              <span className={styles.link_text}>logout</span>
              <CiLogout className={styles.burger_menu_icon} />
            </div>
          </div>
        )}
      </div>
      <div className={styles.burger_button_box}>
        {display ? (
          <RxCross2
            onClick={toggleDisplayHandler}
            className={styles.burger_icon_button}
          />
        ) : (
          <RxHamburgerMenu
            onClick={toggleDisplayHandler}
            className={styles.burger_icon_button}
          />
        )}
      </div>
    </div>
  );
};
