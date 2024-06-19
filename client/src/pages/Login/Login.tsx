import styles from './Login.module.scss';
import { NavLink, Navigate } from 'react-router-dom';
import { LoginErrorType, LoginValueTypes } from '../../types/common_types';
import { ChangeEvent, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../../components/Loaders/Loader';

export const Login = () => {
  const {
    user,
    logInUser,
    isLoading,
    loginEmailInputValue,
    loginPasswordInputValue,
    setLoginEmailInputValue,
    setLoginPasswordInputValue,
  } = useContext(AuthContext);

  const [loginEmailInputError, setLoginEmailInputError] =
    useState<boolean>(false);
  const [loginPasswordInputError, setLoginPasswordInputError] =
    useState<boolean>(false);

  const loginValues: LoginValueTypes = {
    email: loginEmailInputValue,
    password: loginPasswordInputValue,
  };

  const catchLoginEmailValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginEmailInputValue(e.currentTarget.value);
    if (validation.email.length > 0) {
      setLoginEmailInputError(true);
    }
  };

  const catchLoginPasswordValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginPasswordInputValue(e.currentTarget.value);
    if (validation.password.length > 0) {
      setLoginPasswordInputError(true);
    }
  };

  const validate = (values: LoginValueTypes) => {
    const errors: LoginErrorType = {
      email: '',
      password: '',
    };
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length < 6) {
      errors.password = 'Must be at least 6 characters';
    }
    return errors;
  };

  const validation = validate(loginValues);

  const submitLoginValuesHandler = () => {
    if (validation.email && validation.password) {
      setLoginEmailInputError(true);
      setLoginPasswordInputError(true);
    } else if (validation.email) {
      setLoginEmailInputError(true);
    } else if (validation.password) {
      setLoginPasswordInputError(true);
    } else if (!validation.email && !validation.password) {
      logInUser(loginValues);
      setLoginEmailInputError(false);
      setLoginPasswordInputError(false);
    }
  };
  if (user) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={styles.login_main_box}>
      <div className={styles.login_box}>
        {isLoading && <Loader />}
        <form className={styles.login_form}>
          {loginEmailInputError && validation.email ? (
            <div className={styles.formik_error_text_box}>
              <div className={styles.formik_error_text}>{validation.email}</div>
            </div>
          ) : (
            <div className={styles.label_box}>
              <label htmlFor="email">Email Address</label>
            </div>
          )}

          <div className={styles.input_box}>
            <input
              className={styles.login_input}
              id="email"
              name="email"
              type="email"
              onChange={catchLoginEmailValueHandler}
              value={loginEmailInputValue}
            />
          </div>
          {loginPasswordInputError && validation.password ? (
            <div className={styles.formik_error_text_box}>
              <div className={styles.formik_error_text}>
                {validation.password}
              </div>
            </div>
          ) : (
            <div className={styles.label_box}>
              <label htmlFor="password">Password</label>
            </div>
          )}
          <div className={styles.input_box}>
            <input
              className={styles.login_input}
              id="password"
              name="password"
              type="password"
              onChange={catchLoginPasswordValueHandler}
              value={loginPasswordInputValue}
            />
          </div>
          <div
            className={styles.login_button}
            onClick={submitLoginValuesHandler}
          >
            Login
          </div>
          <div className={styles.info_box}>
            <span className={styles.info_text}>
              Don't have an account?{' '}
              <NavLink to={'/signup'} className={styles.signup_link}>
                Sign up
              </NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
