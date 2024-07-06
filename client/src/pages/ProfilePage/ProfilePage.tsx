import { ChangeEvent, useContext, useRef, useState } from 'react';
import styles from './ProfilePage.module.scss';
import { CiUser } from 'react-icons/ci';
import { RxUpdate } from 'react-icons/rx';
import { MdOutlineCancel, MdOutlineDone } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { UpdateProfileCommonTypes } from '../../types/common_types';

export const ProfilePage = () => {
  const {
    user,
    updateUserProfile,
    updateProfileStatus,
    setUpdateProfileStatus,
    updateProfileEmailInputValue,
    updateProfileNickNameInputValue,
    setUpdateProfileEmailInputValue,
    setUpdateProfileNickNameEmailInputValue,
  } = useContext(AuthContext);

  const [updateEmailInputError, setUpdateEmailInputError] =
    useState<boolean>(false);
  const [updateNickNameInputError, setUpdateNickNameInputError] =
    useState<boolean>(false);

  const selectedAvatar = useRef<File | null>(null);

  const updateProfileValues: UpdateProfileCommonTypes = {
    email: updateProfileEmailInputValue,
    nickName: updateProfileNickNameInputValue,
  };

  const validate = (values: UpdateProfileCommonTypes) => {
    const errors: UpdateProfileCommonTypes = {
      email: '',
      nickName: '',
    };
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.nickName) {
      errors.nickName = 'Nickname is required!';
    } else if (values.nickName.length < 3) {
      errors.nickName = 'Must be at least 3 characters';
    }
    return errors;
  };

  const validation = validate(updateProfileValues);

  const changeUpdateProfileStatusHandler = () => {
    setUpdateProfileStatus(true);
    if (user) {
      setUpdateProfileEmailInputValue(user?.email);
      setUpdateProfileNickNameEmailInputValue(user?.nickName);
    }
  };

  const saveProfileChangesHandler = () => {
    if (validation.email && validation.nickName) {
      setUpdateEmailInputError(true);
      setUpdateNickNameInputError(true);
    } else if (validation.email) {
      setUpdateEmailInputError(true);
    } else if (validation.nickName) {
      setUpdateNickNameInputError(true);
    } else if (!validation.email && !validation.nickName) {
      setUpdateEmailInputError(false);
      setUpdateNickNameInputError(false);

      const updatedProfileBody = new FormData();
      if (user) {
        updatedProfileBody.append('userID', user.userID);
        updatedProfileBody.append('avatarPublicID', user.avatarPublicID);
      }
      if (selectedAvatar.current) {
        updatedProfileBody.append('avatar', selectedAvatar.current);
      } else if (user) {
        updatedProfileBody.append('avatar', user.avatar);
      }
      if (updateProfileEmailInputValue) {
        updatedProfileBody.append('email', updateProfileEmailInputValue);
      }
      if (updateProfileNickNameInputValue) {
        updatedProfileBody.append('nickName', updateProfileNickNameInputValue);
      }
      updateUserProfile(updatedProfileBody);
    }
  };

  const catchingNewNickNameInputHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateProfileNickNameEmailInputValue(e.currentTarget.value);
    if (validation.nickName && validation.nickName.length >= 0)
      setUpdateNickNameInputError(true);
  };

  const catchingNewEmailInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateProfileEmailInputValue(e.currentTarget.value);
    if (validation.email && validation.email.length >= 0)
      setUpdateEmailInputError(true);
  };

  const cancelSavingProfileChangesHandler = () => {
    setUpdateProfileStatus(false);
    if (user?.email) {
      setUpdateProfileEmailInputValue(user.email);
    }
    if (user?.nickName) {
      setUpdateProfileNickNameEmailInputValue(user.nickName);
    }
  };
  const selectAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.files);
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      selectedAvatar.current = e.currentTarget.files[0];
    }
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
                  onChange={selectAvatarHandler}
                />
              </div>

              <div className={styles.input_box}>
                {' '}
                {updateEmailInputError && validation.email ? (
                  <div className={styles.error_text_box}>
                    <div className={styles.error_text}>{validation.email}</div>
                  </div>
                ) : (
                  <div className={styles.label_box}>
                    <label htmlFor="email">Email Address</label>
                  </div>
                )}
                <input
                  value={updateProfileEmailInputValue}
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.update_profile_input}
                  onChange={catchingNewEmailInputHandler}
                />
              </div>
              <div className={styles.input_box}>
                {updateNickNameInputError && validation.nickName ? (
                  <div className={styles.error_text_box}>
                    <div className={styles.error_text}>
                      {validation.nickName}
                    </div>
                  </div>
                ) : (
                  <div className={styles.label_box}>
                    <label htmlFor="password">Nickname</label>
                  </div>
                )}
                <input
                  value={updateProfileNickNameInputValue}
                  type="text"
                  name="nickname"
                  placeholder="Nickname"
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
        <>
          <button
            className={styles.save_profile_changes_button}
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
          <button
            className={styles.cancel_profile_changes_button}
            onClick={cancelSavingProfileChangesHandler}
          >
            {' '}
            {updateProfileStatus && (
              <>
                discard changes{' '}
                <MdOutlineCancel className={styles.update_profile_icon} />
              </>
            )}
          </button>
        </>
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
