import { ReactNode, createContext, useState } from 'react';
import {
  LoggedinUserResponseTypes,
  LoginCommonTypes,
  SignupCommonTypes,
  UpdateProfileCommonTypes,
} from '../types/common_types';
import { successfulToast } from '../assets/utils/successfulToast';
import axios from 'axios';
import { baseUrl } from '../assets/utils/baseUrl';
import { removeToken } from '../assets/utils/tokenServices';

type AuthContextType = {
  isLoading: boolean;
  signupEmailInputValue: string;
  signupPasswordInputValue: string;
  signupNickNameInputValue: string;
  loginEmailInputValue: string;
  loginPasswordInputValue: string;
  user: LoggedinUserResponseTypes | null;
  updateProfileStatus: boolean;
  updateProfileEmailInputValue: string | undefined;
  updateProfileNickNameInputValue: string | undefined;
  setUpdateProfileStatus: (newStatus: boolean) => void;
  registerUser: (newUser: SignupCommonTypes) => Promise<void>;
  logInUser: (logInValues: LoginCommonTypes) => Promise<void>;
  logOutUser: () => Promise<void>;
  updateUserProfile: (profileUpdate: UpdateProfileCommonTypes) => Promise<void>;
  setSignupEmailInputValue: (newSignupEmailInputValue: string) => void;
  setSignupPasswordInputValue: (newSignupPasswordInputValue: string) => void;
  setSignupNickNameInputValue: (newSignupNickNameInputValue: string) => void;
  setLoginEmailInputValue: (loginEmailInputValue: string) => void;
  setLoginPasswordInputValue: (loginPasswordInputValue: string) => void;
  setUpdateProfileEmailInputValue: (newEmail: string) => void;
  setUpdateProfileNickNameEmailInputValue: (newNickName: string) => void;
  setIsLoading: (newLoadingStatus: boolean) => void;
};

const authInitialContextState = {
  isLoading: false,
  signupEmailInputValue: '',
  signupPasswordInputValue: '',
  signupNickNameInputValue: '',
  loginEmailInputValue: '',
  loginPasswordInputValue: '',
  updateProfileEmailInputValue: '',
  updateProfileNickNameInputValue: '',
  user: {} as LoggedinUserResponseTypes,
  updateProfileStatus: false,
  setUpdateProfileStatus: () => {
    throw new Error(
      'An error occurred when setting new update profile status!'
    );
  },
  setSignupEmailInputValue: (newSignupEmailInputValue: string) =>
    newSignupEmailInputValue,
  setSignupPasswordInputValue: (newSignupPasswordInputValue: string) =>
    newSignupPasswordInputValue,
  setSignupNickNameInputValue: (newSignupNickNameInputValue: string) =>
    newSignupNickNameInputValue,
  setLoginEmailInputValue: (loginEmailInputValue: string) =>
    loginEmailInputValue,
  setLoginPasswordInputValue: (loginPasswordInputValue: string) =>
    loginPasswordInputValue,
  setUpdateProfileEmailInputValue: (newEmail: string) => newEmail,
  setUpdateProfileNickNameEmailInputValue: (newNickName: string) => newNickName,
  registerUser: () => Promise.resolve(),
  logInUser: () => Promise.resolve(),
  logOutUser: () => Promise.resolve(),
  updateUserProfile: () => Promise.resolve(),
  setIsLoading: () => {
    throw new Error('An error occurred when refreshing the app page!');
  },
} as AuthContextType;

export const AuthContext = createContext(authInitialContextState);

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<LoggedinUserResponseTypes | null>(null);
  const [signupEmailInputValue, setSignupEmailInputValue] =
    useState<string>('');
  const [signupPasswordInputValue, setSignupPasswordInputValue] =
    useState<string>('');
  const [signupNickNameInputValue, setSignupNickNameInputValue] =
    useState<string>('');
  const [loginEmailInputValue, setLoginEmailInputValue] = useState<string>('');
  const [loginPasswordInputValue, setLoginPasswordInputValue] =
    useState<string>('');
  const [updateProfileStatus, setUpdateProfileStatus] =
    useState<boolean>(false);
  const [updateProfileEmailInputValue, setUpdateProfileEmailInputValue] =
    useState<string | undefined>(user?.email);
  const [
    updateProfileNickNameInputValue,
    setUpdateProfileNickNameEmailInputValue,
  ] = useState<string | undefined>(user?.nickName);

  const registerUser = async (newUser: SignupCommonTypes) => {
    console.log(newUser);

    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/users/register`, newUser);
      if (response) {
        console.log('User registration:::', response.data.newUser);

        successfulToast(response.data.message);
        setSignupEmailInputValue('');
        setSignupPasswordInputValue('');
        setSignupNickNameInputValue('');
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const logInUser = async (loginValues: LoginCommonTypes) => {
    console.log(loginValues);

    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/users/login`, loginValues);
      console.log('Login response:::', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      if (response) {
        setUser(response.data.user);
        successfulToast(response.data.message);
      }
    } catch (error) {
      console.log('Login error:::', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logOutUser = async () => {
    setIsLoading(true);
    try {
      successfulToast('Logged out successfully!');
      removeToken();
      setUser(null);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (profileUpdate: UpdateProfileCommonTypes) => {
    console.log(profileUpdate);

    try {
    } catch (error) {}
  };
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        updateProfileStatus,
        setUpdateProfileStatus,
        setUpdateProfileEmailInputValue,
        setUpdateProfileNickNameEmailInputValue,
        registerUser,
        logInUser,
        logOutUser,
        updateUserProfile,
        signupEmailInputValue,
        signupPasswordInputValue,
        signupNickNameInputValue,
        setSignupEmailInputValue,
        setSignupPasswordInputValue,
        setSignupNickNameInputValue,
        loginEmailInputValue,
        loginPasswordInputValue,
        updateProfileEmailInputValue,
        updateProfileNickNameInputValue,
        setLoginEmailInputValue,
        setLoginPasswordInputValue,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
