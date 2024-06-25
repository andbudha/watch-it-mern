import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { CiViewList, CiLogin, CiLogout, CiUser } from 'react-icons/ci';
import { RiMovie2Line } from 'react-icons/ri';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';

export const Navbar = () => {
  const { logOutUser, user } = useContext(AuthContext);
  const { myMovieList, fetchMyMovieList } = useContext(DataContext);

  useEffect(() => {
    fetchMyMovieList(user!._id);
  }, []);

  const logOutHandler = () => {
    logOutUser();
  };
  return (
    <div className={styles.nav_main_box}>
      <div className={styles.nav_link_box}>
        <NavLink to={'/'} className={styles.home_page_link_box}>
          <RiMovie2Line className={styles.logo_icon} />
          <div className={styles.logo_text_box}>
            {' '}
            <span className={styles.logo_text}>.watch..it</span>
          </div>
        </NavLink>
        <div className={styles.links_box}>
          {!user ? (
            <div className={styles.auth_box}>
              <NavLink
                to={'login'}
                className={styles.login_button_box}
                style={({ isActive }) => ({
                  background: isActive ? '#864af9' : '',
                  color: isActive ? '#fff' : '',
                  border: isActive ? '2px solid #864af9' : '',
                })}
              >
                <span className={styles.link_text}>login</span>
                <CiLogin className={styles.login_icon} />
              </NavLink>
              <NavLink
                to={'signup'}
                className={styles.signin_button_box}
                style={({ isActive }) => ({
                  background: isActive ? '#864af9' : '',
                  color: isActive ? '#fff' : '',
                  border: isActive ? '2px solid #864af9' : '',
                })}
              >
                <span className={styles.link_text}>signup</span>
                <CiUser className={styles.signin_icon} />
              </NavLink>
            </div>
          ) : (
            <div className={styles.nav_box}>
              <NavLink
                to={'mylist'}
                className={styles.my_list_link_main_box}
                style={({ isActive }) => ({
                  background: isActive ? '#864af9' : '',
                  color: isActive ? '#fff' : '',
                  border: isActive ? '2px solid #864af9' : '',
                })}
              >
                {user && (
                  <div className={styles.my_list_link_box}>
                    {' '}
                    <span className={styles.link_text}>my list</span>
                    {myMovieList?.length ? (
                      <div className={styles.number_of_items_in_mylist_box}>
                        {' '}
                        <span className={styles.my_list_length}>
                          {myMovieList.length}
                        </span>
                      </div>
                    ) : (
                      <CiViewList className={styles.list_icon} />
                    )}
                  </div>
                )}
              </NavLink>
              <NavLink
                to={'profile'}
                className={styles.profile_button_box}
                style={({ isActive }) => ({
                  background: isActive ? '#864af9' : '',
                  color: isActive ? '#fff' : '',
                  border: isActive ? '2px solid #864af9' : '',
                })}
              >
                <span className={styles.link_text}>profile</span>
                <CiUser className={styles.profile_icon} />
              </NavLink>
              <div className={styles.logout_button_box} onClick={logOutHandler}>
                <span className={styles.link_text}>logout</span>
                <CiLogout className={styles.logout_icon} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.greeting_main_box}>
        {user && (
          <p className={styles.greeting_text_box}>
            Hello,{' '}
            <span className={styles.user_nickname}>{user?.nickName}</span>!
          </p>
        )}
      </div>
    </div>
  );
};
