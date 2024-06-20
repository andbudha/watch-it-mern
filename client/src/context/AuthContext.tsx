import { ReactNode, createContext, useState } from 'react';
import {
  LoginValueTypes,
  SignupValueTypes,
  UserResponseType,
} from '../types/common_types';
import { successfulToast } from '../assets/utils/successfulToast';
import axios from 'axios';
import { baseUrl } from '../assets/utils/baseUrl';

type AuthContextType = {
  isLoading: boolean;
  signupEmailInputValue: string;
  signupPasswordInputValue: string;
  signupNickNameInputValue: string;
  loginEmailInputValue: string;
  loginPasswordInputValue: string;
  user: UserResponseType | null;
  registerUser: (newUser: SignupValueTypes) => Promise<void>;
  logInUser: (logInValues: LoginValueTypes) => Promise<void>;
  logOutUser: () => Promise<void>;
  setSignupEmailInputValue: (newSignupEmailInputValue: string) => void;
  setSignupPasswordInputValue: (newSignupPasswordInputValue: string) => void;
  setSignupNickNameInputValue: (newSignupNickNameInputValue: string) => void;
  setLoginEmailInputValue: (loginEmailInputValue: string) => void;
  setLoginPasswordInputValue: (loginPasswordInputValue: string) => void;
  setIsLoading: (newLoadingStatus: boolean) => void;
};

const authInitialContextState = {
  isLoading: false,
  signupEmailInputValue: '',
  signupPasswordInputValue: '',
  signupNickNameInputValue: '',
  loginEmailInputValue: '',
  loginPasswordInputValue: '',
  user: {} as UserResponseType,
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
  registerUser: () => Promise.resolve(),
  logInUser: () => Promise.resolve(),
  logOutUser: () => Promise.resolve(),
  setIsLoading: () => {
    throw new Error('An error occurred when refreshing the app page!');
  },
} as AuthContextType;

const loggedInUser = {
  _id: '6672b97cb0573d266042c1a9',
  nickName: 'budha',
  email: 'andy@andy.de',
};
export const AuthContext = createContext(authInitialContextState);

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserResponseType | null>(loggedInUser);
  const [signupEmailInputValue, setSignupEmailInputValue] =
    useState<string>('');
  const [signupPasswordInputValue, setSignupPasswordInputValue] =
    useState<string>('');
  const [signupNickNameInputValue, setSignupNickNameInputValue] =
    useState<string>('');

  const [loginEmailInputValue, setLoginEmailInputValue] = useState<string>('');
  const [loginPasswordInputValue, setLoginPasswordInputValue] =
    useState<string>('');

  const registerUser = async (newUser: SignupValueTypes) => {
    console.log(newUser);

    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/users/register`, newUser);
      if (response) {
        successfulToast('User created and logged in successfully!');
        setSignupEmailInputValue('');
        setSignupPasswordInputValue('');
        setSignupNickNameInputValue('');
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const logInUser = async (loginValues: LoginValueTypes) => {
    console.log(loginValues);

    setIsLoading(true);
    try {
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const logOutUser = async () => {
    setIsLoading(true);
    try {
      successfulToast('Logged out successfully!');
      setUser(null);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        registerUser,
        logInUser,
        logOutUser,
        signupEmailInputValue,
        signupPasswordInputValue,
        signupNickNameInputValue,
        setSignupEmailInputValue,
        setSignupPasswordInputValue,
        setSignupNickNameInputValue,
        loginEmailInputValue,
        loginPasswordInputValue,
        setLoginEmailInputValue,
        setLoginPasswordInputValue,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
