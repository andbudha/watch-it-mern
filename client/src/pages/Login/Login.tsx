import { useFormik } from 'formik';
import styles from './Login.module.scss';
import { NavLink, Navigate } from 'react-router-dom';
import { LoginErrorValues, LoginValues } from '../../types/common_types';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../../components/Loaders/Loader';

export const Login = () => {
  const { user, logInUser, isLoading } = useContext(AuthContext);

  const validate = (values: LoginValues) => {
    const errors: LoginErrorValues = {};
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
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values: LoginValues) => {
      console.log(values);
      logInUser(values);
    },
  });

  if (user) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={styles.login_main_box}>
      <div className={styles.login_box}>
        {isLoading && <Loader />}
        <form className={styles.login_form} onSubmit={formik.handleSubmit}>
          {formik.errors.email ? (
            <div className={styles.formik_error_text_box}>
              <div className={styles.formik_error_text}>
                {formik.errors.email}
              </div>
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
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          {formik.errors.password ? (
            <div className={styles.formik_error_text_box}>
              <div className={styles.formik_error_text}>
                {formik.errors.password}
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
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <button className={styles.login_button} type="submit">
            Login
          </button>
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
