import { ReactNode, createContext, useState } from 'react';
import {
  LoginValues,
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
  user: UserResponseType | null;
  registerUser: (newUser: SignupValueTypes) => Promise<void>;
  logInUser: (logInValues: LoginValues) => Promise<void>;
  logOutUser: () => Promise<void>;
  setSignupEmailInputValue: (newSignupEmailInputValue: string) => void;
  setSignupPasswordInputValue: (newSignupPasswordInputValue: string) => void;
  setSignupNickNameInputValue: (newSignupNickNameInputValue: string) => void;

  setIsLoading: (newLoadingStatus: boolean) => void;
};

const authInitialContextState = {
  isLoading: false,
  signupEmailInputValue: '',
  signupPasswordInputValue: '',
  signupNickNameInputValue: '',
  user: {} as UserResponseType,
  setSignupEmailInputValue: (newSignupEmailInputValue: string) =>
    newSignupEmailInputValue,
  setSignupPasswordInputValue: (newSignupPasswordInputValue: string) =>
    newSignupPasswordInputValue,
  setSignupNickNameInputValue: (newSignupNickNameInputValue: string) =>
    newSignupNickNameInputValue,
  registerUser: () => Promise.resolve(),
  logInUser: () => Promise.resolve(),
  logOutUser: () => Promise.resolve(),
  setIsLoading: () => {
    throw new Error('An error occurred when refreshing the app page!');
  },
} as AuthContextType;

export const AuthContext = createContext(authInitialContextState);

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserResponseType | null>(null);
  const [signupEmailInputValue, setSignupEmailInputValue] =
    useState<string>('');
  const [signupPasswordInputValue, setSignupPasswordInputValue] =
    useState<string>('');
  const [signupNickNameInputValue, setSignupNickNameInputValue] =
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
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const logInUser = async () => {
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
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
