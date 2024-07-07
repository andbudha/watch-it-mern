import { ReactNode, createContext, useContext, useState } from 'react';
import {
  LoggedinUserResponseTypes,
  LoginCommonTypes,
  SignupCommonTypes,
  UserIdAndAvatarType,
} from '../types/common_types';
import { successfulToast } from '../assets/utils/successfulToast';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '../assets/utils/baseUrl';
import { getToken, removeToken } from '../assets/utils/tokenServices';
import { DataContext } from './DataContext';

type AuthContextType = {
  allUsersIdAndAvatar: UserIdAndAvatarType[] | null;
  fetchAllUsers: () => void;
  getUserProfile: () => void;
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
  updateUserProfile: (profileUpdate: FormData) => Promise<void>;
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
  allUsersIdAndAvatar: [] as UserIdAndAvatarType[],
  fetchAllUsers: () => Promise.resolve(),
  getUserProfile: () => Promise.resolve(),
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
  const { fetchMyMovieList } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<LoggedinUserResponseTypes | null>(null);
  const [allUsersIdAndAvatar, setAllUsersIdAndAvatar] = useState<
    UserIdAndAvatarType[] | null
  >(null);
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
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/users/register`, newUser);
      if (response) {
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
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/users/login`, loginValues);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      if (response) {
        fetchMyMovieList(response.data.user.userID);
        setUser(response.data.user);
        successfulToast(response.data.message);
        setLoginEmailInputValue('');
        setLoginPasswordInputValue('');
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

  const getUserProfile = async () => {
    const token = getToken();
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      try {
        let response = await fetch(`${baseUrl}/users/profile`, requestOptions);
        const data = await response.json();
        if (data) {
          setUser(data.user);
        }
      } catch (error) {
        console.log('Get user profile error:::', error);
      }
    }
  };

  const updateUserProfile = async (profileUpdate: FormData) => {
    console.log(profileUpdate);

    try {
      const response = await axios.post(
        `${baseUrl}/users/updateprofile`,
        profileUpdate
      );
      if (response) {
        successfulToast('Userprofile updated successfully!');
        setUser(response.data.updatedUser);
        setUpdateProfileStatus(false);
        fetchAllUsers();
        console.log(response);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };

  const fetchAllUsers = async () => {
    try {
      const resonse = await axios.get(`${baseUrl}/users/all`);
      if (resonse) {
        setAllUsersIdAndAvatar(resonse.data.users);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        allUsersIdAndAvatar,
        fetchAllUsers,
        getUserProfile,
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
