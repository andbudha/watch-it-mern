import { ReactNode, createContext, useState } from 'react';
import {
  LoginValues,
  SignupValueTypes,
  UserResponse,
} from '../types/common_types';
import { successfulToast } from '../assets/utils/successfulToast';

type AuthContextType = {
  isLoading: boolean;
  signupEmailInputValue: string;
  signupPasswordInputValue: string;
  user: UserResponse | undefined;
  registerUser: (signUpValues: SignupValueTypes) => Promise<void>;
  logInUser: (logInValues: LoginValues) => Promise<void>;
  logOutUser: () => Promise<void>;
  setSignupEmailInputValue: (newSignupEmailInputValue: string) => void;
  setSignupPasswordInputValue: (newSignupPasswordInputValue: string) => void;

  setIsLoading: (newLoadingStatus: boolean) => void;
};

const authInitialContextState = {
  isLoading: false,
  signupEmailInputValue: '',
  signupPasswordInputValue: '',
  user: {} as UserResponse,
  setSignupEmailInputValue: (newSignupEmailInputValue: string) =>
    newSignupEmailInputValue,
  setSignupPasswordInputValue: (newSignupPasswordInputValue: string) =>
    newSignupPasswordInputValue,
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
  const [user, setUser] = useState<UserResponse | undefined>(undefined);
  const [signupEmailInputValue, setSignupEmailInputValue] =
    useState<string>('');
  const [signupPasswordInputValue, setSignupPasswordInputValue] =
    useState<string>('');

  const registerUser = async () => {
    setIsLoading(true);
    try {
      successfulToast('User created and logged in successfully!');
      setSignupEmailInputValue('');
      setSignupPasswordInputValue('');
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
      setUser(undefined);
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
        setSignupEmailInputValue,
        setSignupPasswordInputValue,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
