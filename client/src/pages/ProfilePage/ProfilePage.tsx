import { ChangeEvent, useContext } from 'react';
import styles from './ProfilePage.module.scss';
import { CiUser } from 'react-icons/ci';
import { RxUpdate } from 'react-icons/rx';
import { MdOutlineDone } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProfilePage = () => {
  const {
    user,
    updateProfileStatus,
    setUpdateProfileStatus,
    updateProfileEmailInputValue,
    updateProfileNickNameInputValue,
    setUpdateProfileEmailInputValue,
    setUpdateProfileNickNameEmailInputValue,
  } = useContext(AuthContext);

  const changeUpdateProfileStatusHandler = () => {
    setUpdateProfileStatus(true);
  };

  const saveProfileChangesHandler = () => {
    setUpdateProfileStatus(false);
  };

  const catchingNewNickNameInputHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateProfileNickNameEmailInputValue(e.currentTarget.value);
  };

  const catchingNewEmailInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateProfileEmailInputValue(e.currentTarget.value);
  };

  if (!user) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={styles.profilepage_main_box}>
      <div className={styles.profile_box}>
        <div className={styles.avatar_box}>
          {user?.avatar ? (
            <img
              src={user?.avatar}
              className={styles.user_avatar}
              alt="user avatar"
            />
          ) : (
            <CiUser className={styles.user_avatar} />
          )}
        </div>
        <div className={styles.user_detail_box}>
          {updateProfileStatus ? (
            <>
              <div className={styles.update_profile_avatar_input_box}>
                {' '}
                <input
                  type="file"
                  name="avatar"
                  className={styles.update_profile_avatar_input}
                />
              </div>

              <div className={styles.input_box}>
                {' '}
                <input
                  value={updateProfileEmailInputValue}
                  type="email"
                  name="email"
                  className={styles.update_profile_input}
                  onChange={catchingNewEmailInputHandler}
                />
              </div>
              <div className={styles.input_box}>
                <input
                  value={updateProfileNickNameInputValue}
                  type="text"
                  name="nickname"
                  className={styles.update_profile_input}
                  onChange={catchingNewNickNameInputHandler}
                />
              </div>
            </>
          ) : (
            <>
              <p className={styles.user_detail_label}>
                Email:{' '}
                <span className={styles.user_details}>{user?.email}</span>
              </p>
              <p className={styles.user_detail_label}>
                Nickname:{' '}
                <span className={styles.user_details}>{user?.nickName}</span>
              </p>
            </>
          )}
        </div>
      </div>
      {updateProfileStatus ? (
        <button
          className={styles.update_profile_button}
          onClick={saveProfileChangesHandler}
        >
          {' '}
          {updateProfileStatus && (
            <>
              save changes{' '}
              <MdOutlineDone className={styles.update_profile_icon} />
            </>
          )}
        </button>
      ) : (
        <button
          className={styles.update_profile_button}
          onClick={changeUpdateProfileStatusHandler}
        >
          {' '}
          <>
            {' '}
            update profile <RxUpdate className={styles.update_profile_icon} />
          </>
        </button>
      )}
    </div>
  );
};
